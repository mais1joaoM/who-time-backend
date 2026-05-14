import { Context } from "koa";

import { AuthService } from "../services/auth.service";

import { generateToken } from "../utils/jwt";

export class AuthController {
    static async register(ctx: Context) {
        try {
            const { name, email, password } =
                ctx.request.body as any;

            const user = await AuthService.register(
                name,
                email,
                password
            );

            ctx.status = 201;

            ctx.body = {
                message: "Usuário criado",
                user,
            };
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }

    static async login(ctx: Context) {
        try {
            const { email, password } =
                ctx.request.body as any;

            const user = await AuthService.login(
                email,
                password
            );

            const token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role,
            });

            ctx.body = {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            };
        } catch (error: any) {
            ctx.status = 401;

            ctx.body = {
                message: error.message,
            };
        }
    }

    static async me(ctx: Context) {
        const user = (ctx.state as any).user;

        ctx.body = {
            user,
        };
    }

    static async findAll(ctx: Context) {
        try {
            const user = (ctx.state as any).user;

            const findUsers =
                await AuthService.findAll(user);

            ctx.body = findUsers;
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }

    static async update(ctx: Context) {
        try {
            const { id } = ctx.params;

            const updated = await AuthService.update(
                Number(id),
                ctx.request.body as any
            );

            ctx.body = updated;
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }

    static async delete(ctx: Context) {
        try {
            const { id } = ctx.params;

            const result = await AuthService.delete(
                Number(id)
            );

            ctx.body = result;
        } catch (error: any) {
            ctx.status = 400;

            ctx.body = {
                message: error.message,
            };
        }
    }
}