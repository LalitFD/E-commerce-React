import express from "express"
import { product } from "../controller/product.controller.js"

const prouter = express.Router()
prouter.post("/save", product)

export { prouter }