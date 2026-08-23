import z from "zod";
import { BRAZILIAN_PHONE_NUMBER_REGEX, EMPLOYEE_ROLES } from "./employee.constants";

const roleEnum = z.enum(EMPLOYEE_ROLES, { error: 'Invalid role. Must be admin, doctor, nurse or receptionist' });

// Create Schema
export const employeeCreateSchema = z.object({
    employeeId: z.string(),
    name: z.string().min(2, 'Name is too short').transform(value => value.toUpperCase()),
    password: z.string().min(5, 'Password should have at least 5 caracteres'),
    email: z.email(),
    phoneNumber: z.string().regex(BRAZILIAN_PHONE_NUMBER_REGEX, { message: "Invalid Brazilian phone number" }),
    role: z.string().transform(value => value.toLowerCase()).pipe(roleEnum),
    isActive: z.boolean().default(true)
}).strict();

// Update Schema
export const employeeUpdateSchema = employeeCreateSchema.partial();

export const employeeFetchSchema = z.object({
    employeeId: z.string(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    role: z.enum(EMPLOYEE_ROLES),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
})


export type EmployeeCreateDTO = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdateDTO = z.infer<typeof employeeUpdateSchema>;
export type EmployeeFetchDTO = z.infer<typeof employeeFetchSchema>;