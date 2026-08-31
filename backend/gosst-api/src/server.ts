import Fastify from "fastify";
import { prisma } from "./lib/prisma.js";

const app = Fastify({
  logger: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "GoSST API",
    version: "1.0.0",
  };
});

app.get("/companies", async () => {
  const companies = await prisma.companies.findMany({
    take: 20,
  });

  return {
    status: "ok",
    total: companies.length,
    companies,
  };
});

const start = async (): Promise<void> => {
  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("🚀 GoSST API iniciada na porta 3000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();