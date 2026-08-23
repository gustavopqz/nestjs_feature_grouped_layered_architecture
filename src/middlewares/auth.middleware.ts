import { getJwtSecret } from '@/config/auth.config';
import { EMPLOYEE_ROLES } from '@/features/employee/employee.constants';
import { ForbiddenError } from '@/errors/forbidden.error';
import { UnauthenticatedError } from '@/errors/unauthenticated.error';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedEmployee {
    employeeId: string;
    role: typeof EMPLOYEE_ROLES[number];
}

declare module 'express-serve-static-core' {
    interface Request {
        employee?: AuthenticatedEmployee;
    }
}

const extractBearerToken = (req: Request): string | undefined => {
    const header = req.headers.authorization;

    if (!header?.startsWith('Bearer ')) return undefined;

    return header.slice('Bearer '.length).trim();
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = extractBearerToken(req);

    if (!token) {
        return next(new UnauthenticatedError('Missing or invalid Authorization header'));
    }

    try {
        const payload = jwt.verify(token, getJwtSecret()) as AuthenticatedEmployee;

        req.employee = { employeeId: payload.employeeId, role: payload.role };

        return next();
    } catch {
        return next(new UnauthenticatedError('Invalid or expired token'));
    }
}

export const authorize = (...allowedRoles: Array<typeof EMPLOYEE_ROLES[number]>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.employee) {
            return next(new UnauthenticatedError());
        }

        if (!allowedRoles.includes(req.employee.role)) {
            return next(new ForbiddenError());
        }

        return next();
    }
}
