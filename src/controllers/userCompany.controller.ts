import { Context } from "koa";
import { UserCompanyService } from "../services/userCompany.service";

export class UserCompanyController {
    static async attach(ctx: Context) {
        try {
            const { user_id, company_id } =
                ctx.request.body as any;

            const result = await UserCompanyService.attach(
                user_id,
                company_id
            );

            ctx.status = 201;
            ctx.body = result;
        } catch (error: any) {
            ctx.status = 400;
            ctx.body = { message: error.message };
        }
    }

    static async findAll(ctx: Context) {
        const result = await UserCompanyService.findAll();
        ctx.body = result;
    }

    static async findByUser(ctx: Context) {
        const { user_id } = ctx.params;

        const result = await UserCompanyService.findByUser(
            Number(user_id)
        );

        ctx.body = result;
    }

    static async detach(ctx: Context) {
        try {
            const { user_id, company_id } =
                ctx.request.body as any;

            const result = await UserCompanyService.detach(
                user_id,
                company_id
            );

            ctx.body = result;
        } catch (error: any) {
            ctx.status = 400;
            ctx.body = { message: error.message };
        }
    }
}