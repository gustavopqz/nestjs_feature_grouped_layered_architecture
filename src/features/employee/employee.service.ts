import bcrypt from 'bcryptjs';
import { EmployeeCreateDTO, EmployeeFetchDTO } from "./employee.dto";
import { EmployeeRepository } from "./employee.repository";

export class EmployeeService {

    constructor(private repo: EmployeeRepository) { }

    public async create(data: EmployeeCreateDTO): Promise<EmployeeFetchDTO> {

        // Hashing password
        const { password, ...employeeInfo } = data;

        const passwordHashed = await bcrypt.hash(password, 12);

        const newEmployee: EmployeeCreateDTO = {
            ...employeeInfo,
            password: passwordHashed
        }

        const createdEmployee = await this.repo.create(newEmployee);

        const response: EmployeeFetchDTO = {
            employeeId: createdEmployee.employeeId,
            name: createdEmployee.name,
            email: createdEmployee.email,
            phoneNumber: createdEmployee.phoneNumber,
            role: createdEmployee.role,
            isActive: createdEmployee.isActive,
            createdAt: createdEmployee.createdAt,
            updatedAt: createdEmployee.updatedAt
        }

        return response;
    }

    public async findAll(): Promise<EmployeeFetchDTO[]> {
        const employees = await this.repo.findAll();

        return employees;
    }
}