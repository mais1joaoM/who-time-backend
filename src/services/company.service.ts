import { Company } from "../models/Company";
import { UserCompany } from "../models/UserCompany";

export class CompanyService {
    static async register(
        name: string,
        cnpj: string
    ) {
        const companyExists =
            await Company.query().findOne({
                cnpj,
            });

        if (companyExists) {
            throw new Error(
                "Empresa já existe"
            );
        }

        const company = await Company.query().insert({
            name,
            cnpj,
        });

        return company;
    }

    static async getCompanyWithContracts(user: any) {
        if (
            user.role === "admin" ||
            user.role === "manager"
        ) {
            return await Company.query()
                .withGraphFetched("contracts");
        }

        const userCompanies =
            await UserCompany.query()
                .where("user_id", user.id);

        const companyIds =
            userCompanies.map(
                (item) => item.company_id
            );

        if (companyIds.length === 0) {
            return [];
        }

        return await Company.query()
            .whereIn("companies.id", companyIds)
            .withGraphFetched("contracts");
    }

    static async update(
        id: number,
        data: Partial<Company>
    ) {
        const company =
            await Company.query().findById(id);

        if (!company) {
            throw new Error(
                "Empresa não encontrada."
            );
        }

        return await Company.query()
            .patchAndFetchById(id, data);
    }

    static async delete(id: number) {
        const company =
            await Company.query().findById(id);

        if (!company) {
            throw new Error(
                "Empresa não encontrada."
            );
        }

        await Company.query().deleteById(id);

        return {
            message:
                "Empresa deletada com sucesso",
        };
    }
}