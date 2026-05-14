import { Model } from "objection";
import { Contract } from "./Contract";

export class Company extends Model {
    id!: number;
    name!: string;
    cnpj!: string;

    static tableName = "companies";

    static relationMappings = {
        contracts: {
            relation: Model.HasManyRelation,
            modelClass: Contract,
            join: {
                from: "companies.id",
                to: "contracts.company_id",
            },
        },
    };
}