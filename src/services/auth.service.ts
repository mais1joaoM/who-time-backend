import bcrypt from 'bcrypt'
import { User } from '../models/User'

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string,
    role: 'user',
  ) {
    const userExists =
      await User.query().findOne({
        email,
      })

    if (userExists) {
      throw new Error(
        'Usuário já existe'
      )
    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user = await User.query().insert({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return user
  }

  static async login(
    email: string,
    password: string
  ) {
    const user =
      await User.query().findOne({
        email,
      })

    if (!user) {
      throw new Error(
        'Credenciais inválidas'
      )
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!passwordMatch) {
      throw new Error(
        'Credenciais inválidas'
      )
    }

    return user
  }
}