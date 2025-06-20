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
