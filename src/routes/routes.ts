import Router from "koa-router";

import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.mddleware";
import { authorize } from "../middlewares/role.middleware";
import { CompanyController } from "../controllers/company.controller";
import { ContractController } from "../controllers/contract.controller";
import { TimeEntryController } from "../controllers/timeentry.controller";
import { CompanyContractController } from "../controllers/companyContract.controller";
import { UserCompanyController } from "../controllers/userCompany.controller";

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);
router.get('/admin', authMiddleware, authorize(['admin']), async (ctx) => {
    ctx.body = { message: 'Acesso permitido para administradores.' };
});
router.get('/users', authMiddleware, authorize(['admin', 'manager']), AuthController.findAll);
router.put('/users/:id', authMiddleware, authorize(['admin', 'manager']), AuthController.update)
router.delete('/users/:id', authMiddleware, authorize(['admin', 'manager']), AuthController.delete)


router.post('/companies', authMiddleware, authorize(['admin', 'manager']), CompanyController.register);
router.post('/companies/:id', authMiddleware, authorize(['admin', 'manager']), CompanyController.delete);
router.get('/companies', authMiddleware, authorize(['admin', 'manager', 'user']), CompanyController.getCompanyWithContracts);
router.put('/companies/:id', authMiddleware, authorize(['admin', 'manager', 'user']), CompanyController.update);
router.delete('/companies/:id', authMiddleware, authorize(['admin', 'manager', 'user']), CompanyController.delete);

router.post('/contracts', authMiddleware, authorize(['admin', 'manager']), ContractController.create);
router.get('/contracts', authMiddleware, authorize(['admin', 'manager']), ContractController.findAll);
router.get('/contracts/:id', authMiddleware, authorize(['admin', 'manager']), ContractController.findById);
router.get('/contracts/:id/history', authMiddleware, authorize(['admin', 'manager', 'user']), ContractController.history);


router.post('/time-entries', authMiddleware, authorize(['admin', 'manager', 'user']), TimeEntryController.create);
router.get('/time-entries', authMiddleware, authorize(['admin', 'manager', 'user']), TimeEntryController.findAll);
router.get('/time-entries/:id', authMiddleware, authorize(['admin', 'manager', 'user']), TimeEntryController.findById);
router.put('/time-entries/:id', authMiddleware, authorize(['admin', 'manager', 'user']), TimeEntryController.update);
router.delete('/time-entries/:id', authMiddleware, authorize(['admin', 'manager', 'user']), TimeEntryController.delete);

router.post('/user-companies', authMiddleware, authorize(['admin', 'manager']), UserCompanyController.attach)
router.get(
    "/user-companies",
    authMiddleware,
    authorize(["admin", "manager"]),
    UserCompanyController.findAll
);
router.delete(
    "/user-companies",
    authMiddleware,
    authorize(["admin", "manager"]),
    UserCompanyController.detach
);


router.get('/company-contracts', authMiddleware, authorize(['admin', 'manager', 'user']),CompanyContractController.getCompaniesWithContracts);

export default router;
