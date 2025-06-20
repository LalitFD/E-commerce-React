import bodyParser from "body-parser";
import express, { Router } from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { router } from "./router/user.router.js";
import { prouter } from "./router/product.router.js";
import { crouter } from "./router/category.router.js";

const app = express();


// mongodb://localhost:27017/Ecommerce

mongoose.connect(process.env.URL).then((result) => {
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", router)
    app.use("/prod", prouter)
    app.use("/category", crouter)

    app.listen(3000, () => {
        console.log("server started")
    })
}).catch((err) => {
    console.log(err)
    console.log("connnection  failed")
})
