//import { User } from "next-auth";
import { forbidden, notFound, redirect, unauthorized } from "next/navigation";
import { verifySession } from "./verifySession";

export async function authorizeResource<T extends object>(
  redirectTo: string,
  fn: any,
  ...args: any[]
) {
  const session = await verifySession(redirectTo);
  //if (session?.role !== "SUPERUSER") return forbidden();
  const resource = await fn(...args);
  if (!resource) return notFound();
  if (session?.role === "SUPERUSER") return resource;
  if (resource.userId && resource.userId === session.user.id) return resource;
  if (session?.role === "ADMIN") return resource;
  return forbidden();
}
