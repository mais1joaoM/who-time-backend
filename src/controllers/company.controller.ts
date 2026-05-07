import { Context } from "koa";
import { CompanyService } from "../services/company.service";

export class CompanyController {
    static async register(ctx: Context) {
        try {
            const { name, cnpj } = ctx.request.body as any

            const company = await CompanyService.register(
                name,
                cnpj
            )

            ctx.status = 201

            ctx.body = {
                message: 'Empresa criada',
                company,
            }
        }catch (error: any) {
            ctx.status = 400

            ctx.body = {
                message: error.message,
            }
        }
    }
}