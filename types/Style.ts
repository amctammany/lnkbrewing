import { Style } from "@prisma/client";

export type StyleType = Omit<Style, "id">;
