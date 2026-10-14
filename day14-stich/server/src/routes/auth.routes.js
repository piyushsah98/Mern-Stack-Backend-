import { Router } from "express";
import { getMe, loginController, refreshController, registerController } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @POST /register
 */
router.post("/register", registerValidator, registerController);


/**
 * @POST /api/auth/register
 */
router.post('/login', loginValidator, loginController)


/**
 * @GET /api/auth/refresh
 */
router.get('/refresh', refreshController)


/**
 * @GET /api/auth/me
 */
router.get('/me', authenticate, getMe)




export default router;
