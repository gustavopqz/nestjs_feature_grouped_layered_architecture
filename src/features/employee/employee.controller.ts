import { Request, Response } from "express";
import z from "zod";
import { employeeCreateSchema } from "./employee.dto";
import { EmployeeRepository } from "./employee.repository";
import { EmployeeService } from "./employee.service";

export class EmployeeController {
    private employeeService: EmployeeService

    constructor() {
        const repo = new EmployeeRepository();
        this.employeeService = new EmployeeService(repo)
    }
    // Create
    // Guarded by `authenticate` + `authorize('admin')` in employee.routes.ts, so only an
    // already-authenticated admin can assign roles (including "admin") to new employees.
    public create = async (req: Request, res: Response) => {
        const result = employeeCreateSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: z.treeifyError(result.error),
            });
        }

        const response = await this.employeeService.create(result.data);

        return res.status(201).json(response);
    }

    public findAll = async (req: Request, res: Response) => {

        const response = await this.employeeService.findAll();

        return res.status(200).json(response);
    }
}