import { Model } from "objection";

export class TimeEntry extends Model {
    id!: number;
    user_id!: number;
    company_id!: number;
    contract_id!: number;
    work_date!: string;
    hours!: number;
    description?: string;
    status!: 'pending' | 'approved' | 'rejected';
    created_at?: string;

    static tableName = 'time_entries';
}

/**
 * 
 *  id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    company_id INT NOT NULL,

    contract_id INT NOT NULL,

    work_date DATE NOT NULL,

    hours DECIMAL(5,2) NOT NULL,

    description TEXT,

    status ENUM(
        'pending',
        'approved',
        'rejected'
    ) DEFAULT 'pending',
 * 
 */