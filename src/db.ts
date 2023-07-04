import { PrismaClient } from "@prisma/client";

/* 
  {
    errorFormat: (default) includes full stack trace w/ colors and syntax highlighting + possible solution

    log: prints all log levels to stdout through an array of LogLevel objects
  }
*/

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;
