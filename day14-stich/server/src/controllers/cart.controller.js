import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'

export const addToCartController = async (req, res) => {
    const { productId, size, quantity } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    const selectedSize = product.sizes.find(s => s.size === size);

    if (!selectedSize) {
        return res.status(400).json({
            message: "Size not available"
        })
    }

    if (selectedSize.stock < quantity) {
        return res.status(400).json({
            message: "Insufficient stock"
        })
    }

    // let cart = await cartModel.findOne({ user: req.user.userId })

    // if(!cart){
    //     cart = await cartModel.create({user: req.user.userId})
    // }


    const cart = (await cartModel.findOne({ user: req.user.userId })) ?? (await cartModel.create({ user: req.user.userId }));

    const productInCart = cart.products.find(p => (p.product.toString() === productId) && (p.size === size));

    if (!productInCart) {

        if (productInCart.quantity + quantity > selectedSize.stock) {
            return res.status(400).json({
                message: "Insufficient stock"
            })
        }

        await cartModel.updateOne(
            {
                user: req.user.userId,
                "products.product": productId,
                "products.size": size
            },
            {
                $inc: {
                    "products.$.quantity": quantity
                }
            }
        )

        return res.status(200).json({
            messafge: "Product quantity updated in cart"
        })
    }

    await cartModel.findByIdAndUpdate(
        { user: req.user.userId },
        {
            $push: {
                products: {
                    product: productId,
                    quantity: quantity,
                    size: size
                }
            }
        }
    )

    return res.status(200).json({
        message: "Product added to cart"
    })
}

export const getCartController = async (req, res) => {

    const cart = (await cartModel.findOne({ user: req.user.userId })) ??
        (await cartModel.create({ user: req.user.userId }));

    return res.status(200).json({
        message: "Cart retrieved successfully",
        data: {
            cart
        }
    })
}