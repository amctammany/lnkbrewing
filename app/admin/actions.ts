"use server";

import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  //userId: zfd.text(),
  id: zfd.text(),
  name: zfd.text(),
  username: zfd.text(),
  email: zfd.text(),
});
export async function updateUserSettings(prev: any, formData: FormData) {
  const v = validateSchema(formData, schema);
  console.log(v);
  if (v.errors) return v;
  if (!v.success) {
    return Promise.resolve(v);
  }
  console.log(v);
  const res = await prisma.user.update({
    where: {
      id: v.data.id,
    },
    data: v.data,
  });
  return redirect("/admin");
  //  return { success: true, data: res };
}
