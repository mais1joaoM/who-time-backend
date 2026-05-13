import { Context } from "koa";
import { TimeEntryService } from "../services/timeentry.service";

export class TimeEntryController {
    static async create(ctx: Context) {
        try {

            const user =
            (ctx.state as any).user

            const {
            company_id,
            contract_id,
            work_date,
            hours,
            description,
            } = ctx.request.body as any

            const timeEntry =
            await TimeEntryService.create(
                user.id,
                company_id,
                contract_id,
                work_date,
                hours,
                description
            )

            ctx.status = 201

            ctx.body = timeEntry

        } catch (error: any) {

            ctx.status = 500

            ctx.body = {
            message: error.message
            }
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

    static async update(ctx: Context) {

        try {

            const { id } = ctx.params;

            const updated =
                await TimeEntryService.update(
                    Number(id),
                    ctx.request.body as any
                );

            ctx.body = updated;

        } catch (error: any) {

            ctx.status = 400;

            ctx.body = {
                message: error.message
            };
        }
    }

    static async delete(ctx: Context) {

        try {

            const { id } = ctx.params;

            const result =
                await TimeEntryService.delete(
                    Number(id)
                );

            ctx.body = result;

        } catch (error: any) {

            ctx.status = 400;

            ctx.body = {
                message: error.message
            };
        }
    }
}