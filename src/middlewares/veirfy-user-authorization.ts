import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

type UserRole = 'employee' | 'manager';

export function verifyUserAuthorization(role: UserRole[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if(!request.user || !role.includes(request.user.role as UserRole)){
            throw new AppError('Unauthorized', 401)
        }

        return next()
    }
}
