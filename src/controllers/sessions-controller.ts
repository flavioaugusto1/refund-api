import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { authConfig } from '../configs/auth'
import { sign } from 'jsonwebtoken'
import { AppError } from '../utils/AppError'
import { compare } from 'bcrypt'

export class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z
        .string()
        .email({ message: 'E-mail inválido!' })
        .trim()
        .toLowerCase(),
      password: z
        .string()
        .trim()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new AppError('E-mail ou senha inválido!', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha inválido!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: _, ...userWithoutPassword } = user

    response.json({
      user: userWithoutPassword,
      token,
    })
  }
}
