import { Context } from "koa";
import { ContractService } from "../services/contract.service";

export class ContractController {
    static async create(ctx: Context) {
        try {
            const {
                company_id,
                name,
                start_date,
                end_date,
                hours_limit,
            } = ctx.request.body as any

            const contract = await ContractService.create(
                company_id,
                name,
                start_date,
                end_date,
                hours_limit
            );
            ctx.status = 201;
            ctx.body = contract;
        }catch (error: any) {
            ctx.status = 400;
            ctx.body = {
                message: error.message,
            }
        }
    }

    static async findAll(ctx: Context) {
        const contracts = await ContractService.findAll();
        ctx.body = contracts;
    }

    static async findById(ctx: Context) {
        const { id } = ctx.params;
        const contract = await ContractService.findById(Number(id));

        if (!contract) {
            ctx.status = 404;
            ctx.body = {
                message: 'Contrato não encontrado',
            }
            return;
        }

        ctx.body = contract;
    }
}