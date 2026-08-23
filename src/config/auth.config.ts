import { JwtSecretNotFoundError } from '@/errors/jwtSecretNotFound.error';
import dotenv from 'dotenv';

dotenv.config();

export const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new JwtSecretNotFoundError();

    return secret;
}

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';
