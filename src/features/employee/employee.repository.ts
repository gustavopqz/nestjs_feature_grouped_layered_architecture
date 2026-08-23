import { PostingOnDatabaseError } from "@/errors/postingOnDatabase.error";
import { EmployeeCreateDTO } from "./employee.dto";
import { Employee, EmployeeDocument } from "./employee.model";

export class EmployeeRepository {

    public async create(data: EmployeeCreateDTO): Promise<EmployeeDocument> {
        try {
            return await Employee.create(data);
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
                throw new PostingOnDatabaseError(`Employee with employeeId "${data.employeeId}" already exists.`);
            }

            throw error;
        }
    }

    public async findAll(): Promise<EmployeeDocument[]> {
        return Employee.find();
    }

    public async findByEmployeeIdWithPassword(employeeId: string): Promise<EmployeeDocument | null> {
        return Employee.findOne({ employeeId }).select('+password');
    }

    public async adminExists(): Promise<boolean> {
        return (await Employee.exists({ role: 'admin' })) !== null;
    }
}