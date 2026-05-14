import bcrypt from "bcrypt";
import { User } from "../models/User";

export class AuthService {
    static async register(
        name: string,
        email: string,
        password: string
    ) {
        const userExists = await User.query()
            .where("email", email)
            .whereNull("deleted_at")
            .first();

        if (userExists) {
            throw new Error("Usuário já existe");
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.query().insert({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
        };
    }

    static async login(
        email: string,
        password: string
    ) {
        const user = await User.query()
            .where("email", email)
            .whereNull("deleted_at")
            .where("is_active", true)
            .first();

        if (!user) {
            throw new Error("Credenciais inválidas");
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            throw new Error("Credenciais inválidas");
        }

        return user;
    }

    static async findAll(user: any) {
        if (
            user.role === "admin" ||
            user.role === "manager"
        ) {
            return await User.query()
                .select(
                    "id",
                    "name",
                    "email",
                    "role",
                    "created_at",
                    "is_active"
                )
                .whereNull("deleted_at");
        }

        return {
            message: "Necessario role",
        };
    }

    static async update(
        id: number,
        data: Partial<User>
    ) {
        const user = await User.query()
            .where("id", id)
            .whereNull("deleted_at")
            .first();

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (data.password) {
            data.password = await bcrypt.hash(
                data.password,
                10
            );
        }

        return await User.query()
            .patchAndFetchById(id, data);
    }

    static async delete(id: number) {
        const user = await User.query()
            .where("id", id)
            .whereNull("deleted_at")
            .first();

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        await User.query()
            .patch({
                deleted_at: new Date(),
                is_active: false,
            } as any)
            .where("id", id);

        return {
            message: "Usuário desativado com sucesso",
        };
    }
}