import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    description: String,
    category: String,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    thumbnail: String
})
export const Product = mongoose.model("product", productSchema);