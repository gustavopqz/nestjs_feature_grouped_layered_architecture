import { EmployeeRepository } from "@/features/employee/employee.repository";
import { Request, Response } from "express";
import z from "zod";
import { loginSchema } from "./auth.dto";
import { AuthService } from "./auth.service";

export class AuthController {
    private authService: AuthService;

    constructor() {
        const repo = new EmployeeRepository();
        this.authService = new AuthService(repo);
    }

    public login = async (req: Request, res: Response) => {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: z.treeifyError(result.error),
            });
        }

        const response = await this.authService.login(result.data);

        return res.status(200).json(response);
    }
}
