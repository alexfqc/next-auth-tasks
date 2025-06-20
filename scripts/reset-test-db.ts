import { execSync } from "child_process";

console.log("🔁 Resetting test database...");

execSync("npx prisma db push --force-reset --schema prisma/schema.prisma", {
  env: {
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  stdio: "inherit",
});
console.log("✅ Test database reset complete.");
