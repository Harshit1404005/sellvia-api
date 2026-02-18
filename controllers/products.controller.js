import {createProduct} from "../repositories/products.repository.js";

export async function addProductController(req, res) {
    const { name, price, description, userId } = req.body;

    if (!name || !price || !description) {
        return res.status(400).send({
            error: "Please enter a product",
        })
    }

    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;

    const product = {
        id: "prod_"+Date.now(),
        userId,
        name,
        price : Number(price),
        description : description || null ,
        imageUrl,
        createdAt: new Date().toISOString(),
    }

    await createProduct(product);

    res.status(201).send({
        message: 'Product Added',
    })
}