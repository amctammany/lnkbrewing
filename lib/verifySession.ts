import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async function (redirect_url = "") {
  const session = await auth();
  if (!session?.user) {
    const url = new URLSearchParams({
      redirect_url,
    }).toString();
    return redirect("/admin/login?" + url.toString());
  }
  return session;
});
