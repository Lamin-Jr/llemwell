import { Pool } from "pg";

async function main() {
  console.log("DATABASE_URL is:", process.env.DATABASE_URL);
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    console.log("Pool connection string:", pool.options.connectionString);
  } catch (e: any) {
    console.error(e);
  }
}
main();
