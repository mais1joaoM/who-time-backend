import { Context } from "koa";
import { CompanyContractService } from "../services/companyContract.service";

export class CompanyContractController {
    static async getCompaniesWithContracts(ctx: Context){
        const companyContracts = await CompanyContractService
        .getCompaniesWithContracts();

        ctx.body = companyContracts;
    }
}