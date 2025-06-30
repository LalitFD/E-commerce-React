import { category } from "../model/category.model.js"

export const categoryy = async (request, response, next) => {
    try {
        let cate = request.body;
        let cat = await category.insertMany(cate)
        return response.status.json({ cat })

    } catch (err) {
        console.log(err)
        return response.status(500).json({ error: "internal server error " })
    }
}
