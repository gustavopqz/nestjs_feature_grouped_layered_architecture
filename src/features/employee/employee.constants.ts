// Single source of truth shared between Zod validation (employee.dto.ts)
// and the Mongoose schema (employee.model.ts) so the two layers can't drift apart.
export const EMPLOYEE_ROLES = ['admin', 'doctor', 'nurse', 'receptionist'] as const;

export const BRAZILIAN_PHONE_NUMBER_REGEX = /^[1-9]{2}9[0-9]{8}$/;
