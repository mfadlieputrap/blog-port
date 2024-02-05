import express from 'express';
import { SignUp } from '../controllers/authController.js';

const route = express.Router();

route.post("/signup", SignUp);

export default route;