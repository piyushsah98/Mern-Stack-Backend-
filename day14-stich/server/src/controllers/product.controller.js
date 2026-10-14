import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
    let imageUrls = [];

    /**
     *  @NOTE use promise all to optimise the for loop
     * */
    for (let i = 0; i < req.files.length; i++) {
        const response = await uploadFile({
            buffer: req.files[i].buffer,
            filename: req.files[0].originalname
        })
        imageUrls.push(response.url)
    }

    // create one products
    const product = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        images: imageUrls,
        price: {
            amount: req.body.price.amount,
            size: req.body.price.size
        },
        sizes: req.body.sizes,
        seller: req.user.userId
    });

    res.status(201).json({
        message: "product created successfully",
        data: {
            product
        }
    })
}

export const listAllProducts = async (req, res) => {
    const allProducts = await productModel.find({
        published: true
    });

    res.status(200).json({
        message: "Products fetched successfully",
        data: {
            products: allProducts
        }
    })
}

export const listAllProductsToSeller = async (req, res) => {
    const product = await productModel.find({})

    return res.status(200).json({
        message: "All products fetched successfully",
        data: {
            product
        }
    })
}

export const unlistProductController = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
        return res.json(404).json({
            message: "product not found by id"
        })
    }

    await productModel.findByIdAndUpdate(id, {
        published: false
    })

    return res.status(200).json({
        message: "Product unpublished successfully"
    })
}

export const listProductController = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
        return res.json(404).json({
            message: "product not found by id"
        })
    }

    await productModel.findByIdAndUpdate(id, {
        published: true
    })

    return res.status(200).json({
        message: "Product published successfully"
    })
}