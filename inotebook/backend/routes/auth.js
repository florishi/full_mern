const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); // email,name and all is entered as per specifications.
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken'); // To verify the user
const fetchuser = require('../middleware/fetchuser');

// creating a secret signature to be used in JWT authentication
const JWT_SECRET = "Shivamissgoodb$boy"

// Route1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Enter a strong password with atleast 5 chars').isLength({ min: 5 })],
   async (req, res) => {
      let success = false;
      // console.log(req.body);
      // const user = User(req.body);
      // user.save();
      // res.send(req.body);

      // If there are errors, return bad request and the errors

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({success,  errors: errors.array() });
      }
      // Check whether the user with the same email already exist
      try {

         let user = await User.findOne({ email: req.body.email })
         if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exist" })
         }

         // Password hashing and adding salt to it
         const salt = await bcrypt.genSalt(10);
         const secPass = await bcrypt.hash(req.body.password, salt);
         // Create a new user
         user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
         });
         user = await user.save();
         // Creating a token for secure interaction b/n client and server
         const data = {
            user: {
               id: user._id     // if we verify using id then fetching will be fast and easy
            }
         };
         const authtoken = jwt.sign(data, JWT_SECRET);

         //  .then(user => res.json(user))
         //  .catch(err=> {console.log(err),  // , can or cannot be used both worked
         // res.json({error: "Please enter a unique value for email", message: err.message})
         // })

         // res.json(user);
         success = true;
         res.json({success, authtoken });
      } catch (error) {
         console.log(error.message);
         res.status(500).send("Internal server error occured");
      }

   })


//Route2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [

   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password cannot be blank').exists()],  // to avoid blank field

   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });
         if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" });
         }

         const passwordCompare = await bcrypt.compare(password, user.password);
         if (!passwordCompare) {
           let  success =false;
            return res.status(400).json({success, error: "Please login with correct credentials" });
         }

         const data = {
            user: {
               id: user._id     // if we verify using id then fetching will be fast and easy
            }
         };
         const authtoken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, authtoken });

      }

      catch (error) {
         console.log(error.message);
         res.status(500).send("Internal server error occured");
      }
   })

//Route3: Get logged in user details  using: POST "/api/auth/getuser".Login required
router.post('/getuser', fetchuser, async (req, res) => {     // async function will run after fetchuser
   try {
     let userId = req.user.id;
      const user = await User.findById(userId).select("-password"); // select all fields except password
      res.send({user});

   } catch (error) {
   console.log(error.message);
         res.status(500).send("Internal server error occured");
}
})
module.exports = router;
