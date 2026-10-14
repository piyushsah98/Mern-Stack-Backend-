import { Router } from 'express'
import { addToCartController, getCartController } from '../controllers/cart.controller.js';
import { addToCartValidator } from '../validators/cart.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router();


/**
 * @method POST
 * @route /api/cart/
 * @description adds the product to the cart of the user.
 * @body { productId, quantity, size }
 */

router.post('/', authenticate, addToCartValidator, addToCartController);


/**
 * @method GET
 * @route /api/cart
 */
router.get('/', authenticate, getCartController)


export default router