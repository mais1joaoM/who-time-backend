import { raw } from "objection";

import { Company } from "../models/Company";
import { Contract } from "../models/Contract";
import { CompanyContract } from "../models/CompanyContract";
import { TimeEntry } from "../models/TimeEntry";

export class ContractService {

    static async create(
        company_id: number,
        name: string,
        start_date?: string,
        end_date?: string,
        hours_limit?: number
    ) {

        const company =
            await Company.query()
                .findById(company_id);

        if (!company) {

            throw new Error(
                'Empresa não encontrada'
            );
        }

        const contract =
            await Contract.query()
                .insert({
                    company_id,
                    name,
                    start_date,
                    end_date,
                    hours_limit,
                });

        await CompanyContract.query()
            .insert({
                company_id,
                contract_id: contract.id
            });

        return contract;
    }

    static async findAll() {

        return await Contract.query();
    }

    static async findById(id: number) {

        return await Contract.query()
            .findById(id);
    }

    static async getHistory(
        contract_id: number
    ) {

        const contract =
            await Contract.query()
                .findById(contract_id);

        if (!contract) {

            throw new Error(
                'Contrato não encontrado.'
            );
        }

        /*
         * BUSCA TODOS OS APONTAMENTOS
         */
        const entries =
            await TimeEntry.query()
                .select(
                    'work_date',
                    'description',
                    'hours'
                )
                .where(
                    'contract_id',
                    contract_id
                )
                .orderBy('work_date');

        /*
         * AGRUPA POR MÊS
         */
        const grouped: any = {};

        for (const entry of entries) {

            const mes =
                new Date(entry.work_date)
                    .toISOString()
                    .slice(0, 7);

            /*
             * CRIA MÊS SE NÃO EXISTIR
             */
            if (!grouped[mes]) {

                grouped[mes] = {

                    mes,

                    total:
                        contract.hours_limit,

                    gasto: 0,

                    percentual: 0,

                    time_entries: []
                };
            }

            /*
             * SOMA HORAS
             */
            grouped[mes].gasto +=
                Number(entry.hours);

            /*
             * ADICIONA ENTRY
             */
            grouped[mes].time_entries.push({

                work_date:
                    entry.work_date,

                description:
                    entry.description,

                hours:
                    Number(entry.hours)
            });
        }

        /*
         * CALCULA %
         */
        const result =
            Object.values(grouped)
                .map((item: any) => ({

                    ...item,

                    percentual:
                        contract.hours_limit
                            ? Number(
                                (
                                    (item.gasto /
                                        contract.hours_limit) * 100
                                ).toFixed(2)
                            )
                            : 0
                }));

        return result;
    }
}