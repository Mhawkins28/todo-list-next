// this is in a sepeate folder bc of the way Prisma works. Next uses Hot-reloading in dev mode, which essentially only send down the files that need to be changed. So it reruns things without actually restarting the server (to make things faster). This howerver, causes a problem with Prisma bc it constantly create new connectiions with Prisma client. 

// article on how to configure https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices 


import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
