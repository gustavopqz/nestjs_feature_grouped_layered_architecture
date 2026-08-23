import z from "zod";

export const loginSchema = z.object({
    employeeId: z.string(),
    password: z.string().min(1, 'Password is required'),
}).strict();

export type LoginDTO = z.infer<typeof loginSchema>;
