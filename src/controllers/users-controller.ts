import { Request, Response } from 'express'
import { UserRole } from '@prisma/client'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'
import { hash } from 'bcrypt'

export class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: 'Nome é obrigatório' }),
      email: z.string().email().trim().toLowerCase(),
      password: z
        .string()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    })

    const { name, email, password, role } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new AppError('Email já cadastrado', 409)
    }

    const passwordHash = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
      },
    })

    response.status(201).json()
  }
}
