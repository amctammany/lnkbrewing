import React from "react";
import { getHop } from "@/app/(ingredients)/hops/queries";
import { notFound } from "next/navigation";
import HopEditor from "../../_components/HopEditor/HopEditor";
import { updateHop } from "@/app/(ingredients)/hops/actions";

export default async function HopDisplayPage({ params }: any) {
  const { slug } = await params;
  const hop = await getHop(slug);
  if (!hop) return notFound();
  return (
    <div>
      <HopEditor src={hop} action={updateHop} />
    </div>
  );
}
