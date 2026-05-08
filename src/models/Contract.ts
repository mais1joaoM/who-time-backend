import { Model } from "objection";

export class Contract extends Model {
    id!: number;
    company_id!: number;
    name!: string;
    start_date?: string;
    end_date?: string;
    hours_limit?: number;

    static tableName = 'contracts';
}