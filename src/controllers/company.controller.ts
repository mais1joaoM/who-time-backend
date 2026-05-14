import { Context } from "koa";
import { CompanyService } from "../services/company.service";

export class CompanyController {
    static async register(ctx: Context) {
        try {
            const { name, cnpj } = ctx.request.body as any;

            const company = await CompanyService.register(
                name,
                cnpj
            );

            ctx.status = 201;

            ctx.body = {
                message: "Empresa criada",
                company,
            };
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }

    static async getCompanyWithContracts(ctx: Context) {
        try {
            const user = (ctx.state as any).user;

            const companies =
                await CompanyService.getCompanyWithContracts(user);

            ctx.body = companies;
        } catch (error: any) {
            ctx.status = 400;
            ctx.body = {
                message: error.message,
            };
        }
    }

    static async update(ctx: Context) {
        try {
            const { id } = ctx.params;

            const updated = await CompanyService.update(
                Number(id),
                ctx.request.body as any
            );

            ctx.body = updated;
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }

    static async delete(ctx: Context) {
        try {
            const { id } = ctx.params;

            const result = await CompanyService.delete(
                Number(id)
            );

            ctx.body = result;
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }
}