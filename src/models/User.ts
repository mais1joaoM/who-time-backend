import { Model } from "objection";

export class User extends Model {
    id!: number;
    name!: string
    email!: string;
    password!: string;
    role!: 'admin' | 'manager' | 'user'
    created_at?: string

    static tableName = 'users';
}