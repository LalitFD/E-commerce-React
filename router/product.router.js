import express from "express"
import { getAllProduct, product, getById, delById } from "../controller/product.controller.js"

const prouter = express.Router()
prouter.post("/save", product);
prouter.get("/get", getAllProduct);
prouter.get("/getId", getById)
prouter.delete("/del", delById)

export { prouter }