export class PostingOnDatabaseError extends Error {
    constructor(message: string) {
        super(`Error posting on Database: ${message}`);
        this.name = 'PostingOnDatabaseError';
    }
}