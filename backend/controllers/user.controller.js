import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js'
import { validationResult } from 'express-validator';

export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        res.status(201).json({ user, token });
    } catch (errors) {
        console.error(errors); // Log the actual error
        res.status(400).json({ message: errors.message || 'User creation failed' });
    }   
}

export const loginController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
        }
        try {

            const { email, password } = req.body;

            const user = await userModel.findOne({ email }).select('+password');

            if (!user) {
                return res.status(401).json({ message:errors.message || 'Invalid email' });
            }

            const isValid = await user.isValidPassword(password);

            if (!isValid) {
                return res.status(401).json({ message:errors.message || 'Invalid password' })
            }

            const token = await user.generateJWT();

            res.status(200).json({ user, token })

            } catch (errors) {

                console.log(errors); // Log the actual error

                res.status(400).json({ message: errors.message || 'Login failed' });
                }
}

export const profileController = async (req, res) => {    
    res.status(200).json({
        user: req.user,
    });
}