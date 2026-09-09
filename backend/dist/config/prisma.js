"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = global.prisma || new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV === "development")
    global.prisma = prisma;
exports.default = prisma;
//# sourceMappingURL=prisma.js.map