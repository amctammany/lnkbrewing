import { prisma } from "@/lib/client";

export const getUser = async (where: any) => {
  const user = await prisma.user.findFirst({ where });
  return user;
};
