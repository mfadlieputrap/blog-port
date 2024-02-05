import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandling } from "../utils/errorHandling.js";

export const SignUp = async (req, res, next) => {
    const { email, password, username } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandling(400, 'All fields are required'));
    }

    const hashPassword = bcryptjs.hashSync(password,15);

    const newUser = new User({
        username,
        email,
        password: hashPassword
    });
    
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}