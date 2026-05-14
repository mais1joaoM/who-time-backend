import { User } from "../models/User";
import { Company } from "../models/Company";
import { UserCompany } from "../models/UserCompany";

export class UserCompanyService {
    static async attach(
        user_id: number,
        company_id: number
    ) {
        const user = await User.query().findById(user_id);
        const company = await Company.query().findById(company_id);

        if (!user || !company) {
            throw new Error("Usuário ou empresa não encontrado");
        }

        const exists = await UserCompany.query().findOne({
            user_id,
            company_id,
        });

        if (exists) {
            throw new Error("Usuário já está vinculado a essa empresa");
        }

        return await UserCompany.query().insert({
            user_id,
            company_id,
        });
    }

    static async findAll() {
        return await UserCompany.query();
    }

    static async findByUser(user_id: number) {
        return await UserCompany.query()
            .where("user_id", user_id);
    }

    static async detach(
        user_id: number,
        company_id: number
    ) {
        const deleted = await UserCompany.query()
            .delete()
            .where("user_id", user_id)
            .where("company_id", company_id);

        if (!deleted) {
            throw new Error("Vínculo não encontrado");
        }

        return {
            message: "Vínculo removido com sucesso",
        };
    }
}