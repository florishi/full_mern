const jwt = require('jsonwebtoken');

const JWT_SECRET = "Shivamissgoodb$boy";

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');   // This name auth-token will be given in header section of thunder client in Get user file.
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();         // this next function will call async function after authentication (jo get user details vala async function h vo next func h) 
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

}
module.exports = fetchuser;