"use client";
import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { YeastInput } from "@/schemas/IngredientSchemas";
import { YeastType } from "@/types/Ingredient";
import { User, Yeast } from "@prisma/client";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type YeastEditorFormContainerProps<S = unknown> = {
  src: YeastType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function YeastEditorFormContainer({
  src,
  action,
  children,
}: YeastEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<YeastInput>({
    defaultValues: src,
    errors: state?.errors,
  });

  return (
    <Form {...form}>
      <form
        action={formAction}
        //        onSubmit={form.handleSubmit(handleAction)}
      >
        {children}
      </form>
    </Form>
  );
}

export type YeastEditorFormProps = {
  src: YeastType;
  //  action: (formData: FormData) => Promise<void>;
};
type A = YeastType["name"];
export function YeastEditorForm({ src }: YeastEditorFormProps) {
  const { register, control } = useFormContext<YeastType>();
  return (
    <>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("userId")} />
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Duuuuescription" {...register("description")} />

      <Button type="submit">Save</Button>
    </>
  );
}
