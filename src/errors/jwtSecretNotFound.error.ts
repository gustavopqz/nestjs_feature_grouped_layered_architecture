export class JwtSecretNotFoundError extends Error {
    constructor() {
        super('JWT_SECRET is not set among the environment variables');
        this.name = 'JwtSecretNotFoundError';
    }
}
