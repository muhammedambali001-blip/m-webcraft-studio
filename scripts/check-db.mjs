import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const rows = await db.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 3 });
console.log(JSON.stringify(rows, null, 2));
await db.$disconnect();
