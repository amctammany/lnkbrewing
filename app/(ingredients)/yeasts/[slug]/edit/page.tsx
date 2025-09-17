import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getYeast, getYeasts } from "@/app/(ingredients)/yeasts/queries";
import { YeastDisplay } from "@/app/(ingredients)/yeasts/_components/YeastDisplay/YeastDisplay";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  YeastEditorForm,
  YeastEditorFormContainer,
} from "../../_components/YeastEditor/YeastEditorForm";
import { updateYeast } from "../../actions";
import YeastEditor from "../../_components/YeastEditor/YeastEditor";
export async function generateStaticParams() {
  return (await getYeasts()).map(({ slug }) => ({ slug }));
}

export default async function YeastEditorPage({ params }: any) {
  const { slug } = await params;
  const yeast = await getYeast(slug);
  if (!yeast) return notFound();
  return <YeastEditor yeast={yeast} action={updateYeast} />;
}
