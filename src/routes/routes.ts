import Router from "koa-router";

import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.mddleware";
import { authorize } from "../middlewares/role.middleware";
import { CompanyController } from "../controllers/company.controller";
import { ContractController } from "../controllers/contract.controller";

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);
router.get('/admin', authMiddleware, authorize(['admin']), async (ctx) => {
    ctx.body = { message: 'Acesso permitido para administradores.' };
});

router.post('/companies', authMiddleware, authorize(['admin', 'manager']), CompanyController.register);

router.post('/contracts', authMiddleware, authorize(['admin', 'manager']), ContractController.create);
router.get('/contracts', authMiddleware, authorize(['admin', 'manager']), ContractController.findAll);
router.get('/contracts/:id', authMiddleware, authorize(['admin', 'manager']), ContractController.findById);

export default router;
