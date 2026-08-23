import { JWT_EXPIRES_IN, getJwtSecret } from "@/config/auth.config";
import { UnauthenticatedError } from "@/errors/unauthenticated.error";
import { EmployeeRepository } from "@/features/employee/employee.repository";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { LoginDTO } from "./auth.dto";

export class AuthService {

    constructor(private employeeRepo: EmployeeRepository) { }

    public async login(data: LoginDTO): Promise<{ token: string }> {
        const employee = await this.employeeRepo.findByEmployeeIdWithPassword(data.employeeId);

        if (!employee || !employee.isActive) {
            throw new UnauthenticatedError('Invalid employeeId or password');
        }

        const passwordMatches = await bcrypt.compare(data.password, employee.password!);

        if (!passwordMatches) {
            throw new UnauthenticatedError('Invalid employeeId or password');
        }

        const token = jwt.sign(
            { employeeId: employee.employeeId, role: employee.role },
            getJwtSecret(),
            { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] }
        );

        return { token };
    }
}
