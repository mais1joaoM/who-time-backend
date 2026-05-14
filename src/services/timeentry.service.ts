import { Company } from "../models/Company";
import { TimeEntry } from "../models/TimeEntry";
import { Contract } from "../models/Contract";
import { User } from "../models/User";

export class TimeEntryService {

    static async create(
        user_id: number,
        company_id: number,
        contract_id: number,
        work_date: string,
        hours: number,
        description?: string,
    ) {

        const company =
            await Company.query()
                .findById(company_id);

        const user =
            await User.query()
                .findById(user_id);

        const contract =
            await Contract.query()
                .findById(contract_id);

        if (!company || !user || !contract) {

            throw new Error(
                'Empresa, usuário ou contrato não encontrado'
            );
        }

        return await TimeEntry.query().insert({
            user_id,
            company_id,
            contract_id,
            work_date,
            hours,
            description,
            status: 'pending',
        });
    }

    static async findAll(user: any) {

        if (
            user.role === 'admin' ||
            user.role === 'manager'
        ){
            return await TimeEntry.query();
        }

        return await TimeEntry.query().where(
            'user_id',
            user.id
        )

        
    }

    static async findById(id: number) {

        return await TimeEntry.query()
            .findById(id);
    }

    static async update(
        id: number,
        data: Partial<TimeEntry>
    ) {

        const timeEntry =
            await TimeEntry.query()
                .findById(id);

        if (!timeEntry) {

            throw new Error(
                'Apontamento não encontrado'
            );
        }

        return await TimeEntry.query()
            .patchAndFetchById(id, data);
    }

    static async delete(id: number) {

        const timeEntry =
            await TimeEntry.query()
                .findById(id);

        if (!timeEntry) {

            throw new Error(
                'Apontamento não encontrado'
            );
        }

        await TimeEntry.query()
            .deleteById(id);

        return {
            message:
                'Apontamento deletado com sucesso'
        };
    }
}