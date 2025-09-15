import { auth } from "@/auth";
//import { User } from "next-auth";
import { forbidden, notFound, unauthorized } from "next/navigation";

//@ts-expect-error "Dunno Why"
export async function authorizeResource<T extends object>(fn, ...args) {
  const session = await auth();
  if (!session?.user) return unauthorized();
  //if (session?.role !== "SUPERUSER") return forbidden();
  const resource = await fn(...args);
  if (!resource) return notFound();
  if (session?.role === "SUPERUSER") return resource;
  if (resource.userId && resource.userId === session.user.id) return resource;
  if (session?.role === "ADMIN") return resource;
  return forbidden();
}
