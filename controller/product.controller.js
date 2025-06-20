import { request, response } from "express";
import { Product } from "../model/product.model.js";

export const product = async (request, response, next) => {
    try {
        let productList = request.body;

        let prod = await Product.insertMany(productList);

        return response.status(201).json({ message: "All products saved successfully", prod });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
};


export const getAllProduct = async (request, response, next) => {
    try {
        let produ = await Product.find();
        return response.status(200).json({ message: produ })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error " })
    }
}

export const getById = async (request, response, next) => {
    try {
        let id = request.body._id;
        let prod = await Product.findById(id)
        return response.status(200).json({ message: prod })
    } catch (err) {
        console.log(err)
        return response.status.json({ error: "internal server error " })
    }
}

export const delById = async (request, response, next) => {
    try {
        let id = request.body._id;
        console.log(id)
        // findByIdAndDelete
        let del = await Product.findByIdAndDelete(id)
        return response.status(200).json({ message: "delete success", del })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" })
    }
}