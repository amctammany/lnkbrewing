"use client";
import { Form } from "@/components/ui/form";
import type { Style } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { updateStyle } from "../../actions";

export default function StyleEditorContainer({
  style,
  action,
  children,
}: {
  style: Style;
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
}) {
  const form = useForm<Style>({
    defaultValues: style,
  });
  return (
    <Form {...form}>
      <form action={action}>{children}</form>
    </Form>
  );
}
