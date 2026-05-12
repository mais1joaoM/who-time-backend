import { CompanyContract } from "../models/CompanyContract";

export class CompanyContractService {

    static async getCompaniesWithContracts() {

        const relations = await CompanyContract.query()
            .joinRelated('[company, contract]')
            .select(
                'company.id as company_id',
                'company.name as company_name',
                'contract.id as contract_id',
                'contract.name as contract_name'
            );

        const grouped = relations.reduce((acc: any, item: any) => {

            if (!acc[item.company_id]) {

                acc[item.company_id] = {
                    company: item.company_name,
                    contracts: []
                };

            }

            acc[item.company_id].contracts.push({
                id: item.contract_id,
                name: item.contract_name
            });

            return acc;

        }, {});

        return Object.values(grouped);

    }

}