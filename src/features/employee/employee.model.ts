import mongoose, { Document, Schema } from 'mongoose';
import { BRAZILIAN_PHONE_NUMBER_REGEX, EMPLOYEE_ROLES } from './employee.constants';

export interface EmployeeDocument extends Document {
    employeeId: string;
    name: string;
    password?: string;
    email: string;
    phoneNumber: string;
    role: typeof EMPLOYEE_ROLES[number];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EmployeeModel: Schema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        select: false
    },
    email: {
        type: String,
        required: true,
        // Intentionally a simpler backstop pattern than the DTO's z.email() -
        // this is a defense-in-depth check, not the source of truth for email validity.
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phoneNumber: {
        type: String,
        required: true,
        match: BRAZILIAN_PHONE_NUMBER_REGEX
    },
    role: {
        type: String,
        enum: EMPLOYEE_ROLES,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Employee = mongoose.model<EmployeeDocument>('Employee', EmployeeModel);