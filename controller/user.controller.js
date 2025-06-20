import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (request, response, next) => {

    let error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() })
    }
    try {
        let { name, password, email, contact } = request.body;

        let saltKey = bcrypt.genSaltSync(12);
        password = bcrypt.hashSync(password, saltKey);

        User.create({ name, password, email, contact }).then((result) => {
            return response.status(200).json({ user: result })
        }).catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "user not created" })
        })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error " })
    }
}


export const login = async (request, response, next) => {
    try {
        let { email, password } = request.body;

        let use = await User.findOne({ email })
        if (!use)
            return response.status(400).json({ error: "unauthorized user | email not valid " })

        let status = bcrypt.compareSync(password, use.password);

        if (!status) {
            return response.status(400).json({ error: "unathorized user | wrong Password " })
        }
        else {
            response.cookie("token", generateToken(use.id, use.email))
            return response.status(200).json({ message: "Login success", use })
        }

    } catch (err) {
        console.log(err)
        return response.status(500).json({ error: "internal server error " })
    }
}

export const generateToken = (id, email) => {
    let payload = { id, email }
    let token = jwt.sign(payload, process.env.secure_key, { expiresIn: "1hr" })
    console.log(token)
    return token;
}


export const logOut = async (request, response, next) => {
    try {
        await response.clearCookie("token");
        return response.status(200).json({ message: "logout success" })
    } catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal server error " })
    }
}