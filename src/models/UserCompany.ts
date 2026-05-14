import { Model } from "objection";

export class UserCompany extends Model {
    id!: number;
    user_id!: number;
    company_id!: number;

    static tableName = "user_companies";
}