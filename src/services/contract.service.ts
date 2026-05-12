import { Company } from "../models/Company";
import { Contract } from "../models/Contract";
import { CompanyContract } from "../models/CompanyContract";

export class ContractService {
    static async create(
        company_id: number,
        name: string,
        start_date?: string,
        end_date?: string,
        hours_limit?: number
    ){
        const company = await Company.query().findById(company_id);

        if(!company){
            throw new Error('Empresa não encontrada');
        }

        const contract = await Contract.query().insert({
            company_id,
            name,
            start_date,
            end_date,
            hours_limit,
        });

        const companyContract = await CompanyContract.query().insert({
            company_id: company_id,
            contract_id: contract.id
        })

        return contract;
    }

    static async findAll(){
        return await Contract.query();
    }

    static async findById(id: number){
        return await Contract.query().findById(id);
    }
}