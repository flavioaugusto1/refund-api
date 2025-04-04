import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { authConfig } from '../configs/auth'
import { AppError } from '../utils/AppError'

interface TokenPayload {
  role: string
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError('JWT token não encontrado', 401)
    }

    const [, token] = authHeader.split(' ')

    const { sub: user_id, role } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload

    request.user = {
      id: user_id,
      role,
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}
