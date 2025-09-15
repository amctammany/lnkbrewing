import { auth } from "@/auth";
//import { User } from "next-auth";
import { forbidden, notFound, redirect, unauthorized } from "next/navigation";

export async function authorizeResource<T extends object>(
  redirectTo: string,
  fn: any,
  ...args: any[]
) {
  const session = await auth();
  if (!session?.user)
    return redirect(
      "/admin/login?" +
        new URLSearchParams({ redirect_url: redirectTo }).toString()
    );
  //if (session?.role !== "SUPERUSER") return forbidden();
  const resource = await fn(...args);
  if (!resource) return notFound();
  if (session?.role === "SUPERUSER") return resource;
  if (resource.userId && resource.userId === session.user.id) return resource;
  if (session?.role === "ADMIN") return resource;
  return forbidden();
}
