import { Context, Next } from 'koa'

export function authorize(
  roles: string[]
) {
  return async (
    ctx: Context,
    next: Next
  ) => {
    const user = (ctx.state as any)
      .user

    if (!user) {
      ctx.status = 401

      ctx.body = {
        message:
          'Usuário não autenticado.',
      }

      return
    }

    if (
      !roles.includes(user.role)
    ) {
      ctx.status = 403

      ctx.body = {
        message:
          'Acesso negado.',
      }

      return
    }

    await next()
  }
}