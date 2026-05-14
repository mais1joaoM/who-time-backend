import { Model } from "objection";
import { Company } from "./Company";

export class Contract extends Model {
    id!: number;
    company_id!: number;
    name!: string;
    start_date?: string;
    end_date?: string;
    hours_limit?: number;

    static tableName = "contracts";

    static relationMappings = {
        company: {
            relation: Model.BelongsToOneRelation,
            modelClass: Company,
            join: {
                from: "contracts.company_id",
                to: "companies.id",
            },
        },
    };
}