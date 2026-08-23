import { EmployeeRepository } from "./employee.repository";
import { EmployeeService } from "./employee.service";

// `POST /employee` is admin-only, so a bootstrap admin must exist before anyone can log in
// and create further employees. Mirrors the pattern in docker/mongo-init.js, which seeds the
// app-level DB user the same way: create-if-missing, driven entirely by env vars.
export const seedInitialAdmin = async (): Promise<void> => {
    const repo = new EmployeeRepository();

    if (await repo.adminExists()) return;

    const {
        SEED_ADMIN_EMPLOYEE_ID,
        SEED_ADMIN_PASSWORD,
        SEED_ADMIN_NAME,
        SEED_ADMIN_EMAIL,
        SEED_ADMIN_PHONE_NUMBER,
    } = process.env;

    if (!SEED_ADMIN_EMPLOYEE_ID || !SEED_ADMIN_PASSWORD || !SEED_ADMIN_NAME || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PHONE_NUMBER) {
        console.warn('⚠️  No admin employee exists and SEED_ADMIN_* env vars are not fully set - POST /api/v1/employee will be unreachable until an admin is created directly in the database.');
        return;
    }

    const service = new EmployeeService(repo);

    await service.create({
        employeeId: SEED_ADMIN_EMPLOYEE_ID,
        name: SEED_ADMIN_NAME,
        password: SEED_ADMIN_PASSWORD,
        email: SEED_ADMIN_EMAIL,
        phoneNumber: SEED_ADMIN_PHONE_NUMBER,
        role: 'admin',
        isActive: true,
    });

    console.log(`🔑 Seeded initial admin employee "${SEED_ADMIN_EMPLOYEE_ID}"`);
}
