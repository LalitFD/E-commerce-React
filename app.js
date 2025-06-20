import bodyParser from "body-parser";
import express, { Router } from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import { router } from "./router/user.router.js";
import { prouter } from "./router/product.router.js";

const app = express();

mongoose.connect(process.env.URL).then((result) => {
    app.use(bodyParser.json())

    app.use("/", router)
    app.use("/prod", prouter)

    app.listen(3000, () => {
        console.log("server started")
    })
}).catch((err) => {
    console.log(err)
    console.log("connnection  failed")
})

