import express from "express"
import { categoryy } from "../controller/category.controller.js";

const crouter = express();

crouter.post("/cate", categoryy)

export {crouter};

