import express from "express"
import { register, login } from "../controller/user.controller.js";
// import { validationResult } from "express-validator";
import { validate } from "../validate/user.validate.js";
const router = express.Router();

router.post("/register", validate, register)
router.post("/login", login)

export { router }