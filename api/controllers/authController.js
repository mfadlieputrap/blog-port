import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

export const SignUp = async (req, res) => {
    const { email, password, username } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({message: 'All fields are required'});
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
        res.status(409).json({message: error.message});
    }
}