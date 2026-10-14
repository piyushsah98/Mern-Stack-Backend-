import { Router } from "express"
import { createProductValidator, unlistProductValidator, listProductValidator } from "../validators/product.validator.js";
import multer, { memoryStorage } from 'multer'
import { authenticate, authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, listAllProducts, unlistProductController, listProductController, listAllProductsToSeller } from "../controllers/product.controller.js";

const router = Router();

const upload = multer({
    storage: memoryStorage(),
    limits: {
        files: 5,
        fileSize: 1 * 1024 * 1024 // 1MB
    }
})

/**
 * @method POST 
 * @route /api/products
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * @access seller
 */
router.post('/',
    // Check user is authenticated or not 
    authenticate,

    // Check the role is seller or not
    authenticateSeller,

    // required for reading the data from the req.body if the format is form-data(multipart data)
    upload.array("images"),

    // parse the complex data like objects and arrays into json
    (req, res, next) => {
        req.body?.price && (req.body.price = JSON.parse(req.body.price))
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))
        next()
    },
    createProductValidator,
    createProduct
)


/**
 * @method GET
 * @route /api/products
 * @description fetch all the published product present in db
 * @access publicc
 */
router.get('/', authenticate, listAllProducts)


/**
 * @method GET
 * @route /api/products/seller
 * @description fetch all the products present in db
 * @access seller
 */
router.get('/seller', authenticate, authenticateSeller, listAllProductsToSeller)


/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description unlist the product by id, only seller can unlist the product
 * @access seller
 */
router.patch('/unlist/:id', authenticate, authenticateSeller, unlistProductValidator, unlistProductController)


/**
 * @method PATCH
 * @route /api/products/list/:id
 * @description list the product by id, only seller can list the product
 * @access seller
 */
router.patch('/list/:id', authenticate, authenticateSeller, listProductValidator, listProductController)



export default router