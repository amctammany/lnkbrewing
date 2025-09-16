import { User } from "@prisma/client";

export type BaseUser = Pick<User, "id" | "name" | "role" | "username">;
