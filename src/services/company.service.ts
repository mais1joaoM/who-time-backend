import { error } from "node:console";
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

    
    static async delete(id: number){
        const companyExists = await Company.query().findById(id)

        if (!companyExists){
            throw new Error('Empresa não encontrada.')
        }

        await Company.query().where('id', id).delete()

        return { message: 'Empresa deletada com sucesso.' }
    }
}