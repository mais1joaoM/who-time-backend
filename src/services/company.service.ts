import { Company } from "../models/Company";

export class CompanyService {
    static async register(
        name: string,
        cnpj: string
    ) {
        const companyExists =
            await Company.query().findOne({
                cnpj,
            })

            if (companyExists) {
                throw new Error(
                    'Empresa já existe'
                )
            }

            const company = await Company.query().insert({
                name,
                cnpj,
            })

            return company
        }
}