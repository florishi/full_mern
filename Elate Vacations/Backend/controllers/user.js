import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TourModel from "../models/tour.js";
import UserModel from "../models/user.js";

const secret_key = "testkey";

// User SignUp end point
export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName}`
        });



        const token = jwt.sign({ email: result.email, id: result._id, }, secret_key, { expiresIn: "1h" });
        res.status(201).json({ result, token });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// User Sign In end point
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email: email});
        if (!oldUser) {
            return res.status(404).json({ message: "user doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email, id: oldUser._id }, secret_key, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}






