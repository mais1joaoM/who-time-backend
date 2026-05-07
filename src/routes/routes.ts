import Router from "koa-router";

import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.mddleware";
import { authorize } from "../middlewares/role.middleware";

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);
router.get('/admin', authMiddleware, authorize(['admin']), async (ctx) => {
    ctx.body = { message: 'Acesso permitido para administradores.' };
});

export default router;
