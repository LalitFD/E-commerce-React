import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import nodemailer from "nodemailer"
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

        let result = await User.create({ name, password, contact, email })
        await sendEmail(name, email);
        return response.status(201).json({ message: "user created", user: result });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error " })
    }
}


export const login = async (request, response, next) => {
    try {
        let { email, password } = request.body;

        let use = await User.findOne({ email })
        if (!use.isVarify) return response.status(400).json({ message: "Account not varified " })
        if (!use) return response.status(400).json({ error: "unauthorized user | email not valid " })
        let status = bcrypt.compareSync(password, use.password);
        if (!status) return response.status(400).json({ error: "unathorized user | wrong Password " })

        else {
            use.password = undefined;
            response.cookie("token", generateToken(use._id, use.email))
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


export const sendEmail = (name, email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.mail_id,
            pass: process.env.mail_password
        }
    });

    console.log(email);

    let mailOptions = {
        from: process.env.mail_id,
        to: email,
        subject: 'Verified Your Account 😊 ',
        html: `<h4>Dear ${name}</h4>
            <p>Thank you for registration. To verify account please click on below button</p>
            <form method="post" action="http://localhost:3000/verification">
              <input type="hidden" name="email" value=${email}/>
              <button type="submit" style="background-color: blue; color:white; width:200px;height:30px; border: 1px solid grey; border-radius:10px;">Verify</button>
            </form>
            <p>
               <h6>Thank you</h6>
               E-commerce Creater.
            </p>
            `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



export const userVerified = async (request, response, next) => {
    try {
        let { email } = request.body;
        email = email.trim().replace(/\/$/, '');

        console.log("Email received:", email);

        let v = await User.updateOne({ email }, { $set: { isVarify: true } });
        return response.status(200).json({ message: "User verified success", v });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
};
