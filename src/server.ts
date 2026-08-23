import { connectDB } from '@/config/db.config';
import authRouter from '@/features/auth/auth.routes';
import employeeRouter from '@/features/employee/employee.routes';
import { seedInitialAdmin } from '@/features/employee/employee.seed';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { DBConnectionError } from './errors/dbConnection.error';
import { ForbiddenError } from './errors/forbidden.error';
import { PostingOnDatabaseError } from './errors/postingOnDatabase.error';
import { UnauthenticatedError } from './errors/unauthenticated.error';

const routePrefix = '/api/v1'

function registerProcessSafetyNets() {
    process.on('unhandledRejection', (reason) => {
        console.error('❌ Unhandled promise rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
        console.error('❌ Uncaught exception:', error);
    });
}

function registerGracefulShutdown(server: import('http').Server) {
    const shutdown = async (signal: NodeJS.Signals) => {
        console.log(`\n${signal} received, shutting down gracefully...`);

        server.close(async () => {
            await mongoose.disconnect();
            console.log('🌿 MongoDB disconnected');
            process.exit(0);
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

async function startServer() {
    registerProcessSafetyNets();

    const app = express();

    app.use(cors());
    app.use(express.json());

    // DB Connection
    try {
        await connectDB();
        console.log('🌿 MongoDB connected succesfully');

        await seedInitialAdmin();

        app.use(`${routePrefix}/auth`, authRouter);
        app.use(`${routePrefix}/employee`, employeeRouter);

        app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
            console.error(err);

            if (err instanceof PostingOnDatabaseError) {
                return res.status(409).json({ success: false, error: err.message });
            }

            if (err instanceof UnauthenticatedError) {
                return res.status(401).json({ success: false, error: err.message });
            }

            if (err instanceof ForbiddenError) {
                return res.status(403).json({ success: false, error: err.message });
            }

            return res.status(500).json({ success: false, error: 'Internal server error' });
        });

        const PORT = process.env.PORT || 3000;

        const server = app.listen(PORT, () => {
            console.log(`🔥 Server running at port ${PORT}`);
        })

        registerGracefulShutdown(server);

    } catch (error) {
        console.error("❌ Failed to start server");

        if (error instanceof DBConnectionError) {
            console.error("DB Error:", error.message);
            console.error("Cause:", error.cause);
        } else if (error instanceof Error) {
            console.error(error.message);
            console.error(error.stack);
        } else {
            console.error("Unknown error:", error);
        }

        process.exit(1);
    }
}

startServer();