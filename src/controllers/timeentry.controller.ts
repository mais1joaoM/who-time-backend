import { Context } from "koa";
import { TimeEntryService } from "../services/timeentry.service";

export class TimeEntryController {
    static async create(ctx: Context){
        try {
            const {
                user_id,
                company_id,
                contract_id,
                work_date,
                hours,
                description,
            } = ctx.request.body as any

            const timeEntry = await TimeEntryService.create(
                user_id,
                company_id,
                contract_id,
                work_date,
                hours,
                description,
            );
            ctx.status = 201;
            ctx.body = timeEntry;
        } catch (error: any) {
            ctx.status = 500;
            ctx.body = { message: error.message };
        }
    }

    static async findAll(ctx: Context){
        const timeEntries = await TimeEntryService.findAll();
        ctx.body = timeEntries;
    }

    static async findById(ctx: Context){
        const { id } = ctx.params;
        const timeEntry = await TimeEntryService.findById(Number(id));

        if(!timeEntry){
            ctx.status = 404;
            ctx.body = {
                message: 'Registro de tempo não encontrado',
            }
            return;
        }
        ctx.body = timeEntry;
    }
}