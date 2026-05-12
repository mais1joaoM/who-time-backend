import { Model } from "objection";
import { Company } from "./Company";
import { Contract } from "./Contract";

export class CompanyContract extends Model {

    id!: number;
    company_id!: number;
    contract_id!: number;

    static tableName = 'company_contracts';

    static relationMappings = {

        company: {
            relation: Model.BelongsToOneRelation,
            modelClass: Company,
            join: {
                from: 'company_contracts.company_id',
                to: 'companies.id'
            }
        },

        contract: {
            relation: Model.BelongsToOneRelation,
            modelClass: Contract,
            join: {
                from: 'company_contracts.contract_id',
                to: 'contracts.id'
            }
        }

    };

}