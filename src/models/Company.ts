import { Model } from "objection";

export class Company extends Model {
    id!: number;
    name!: string;
    cnpj!: string;

    static tableName = 'companies';
}