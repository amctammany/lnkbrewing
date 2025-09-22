"use client";
import InputField from "@/components/Form/InputField";
import SelectInput from "@/components/Form/SelectInput";
import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OtherInput } from "@/schemas/IngredientSchemas";
import { OtherType } from "@/types/Ingredient";
import { $Enums, User } from "@prisma/client";
import { Percent } from "lucide-react";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type OtherEditorFormContainerProps<S = unknown> = {
  src: OtherType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function OtherEditorFormContainer({
  src,
  action,
  children,
}: OtherEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  console.log(src);
  const form = useForm<OtherType>({
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

export type OtherEditorFormProps = {
  src: OtherType;
  //  action: (formData: FormData) => Promise<void>;
};
export function OtherEditorForm({}: OtherEditorFormProps) {
  const { register, control } = useFormContext<OtherType>();
  return (
    <Card className="m-4">
      <CardHeader className="border-b-4">
        <CardTitle>Other Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("userId")} />
        <TextInput name="name" control={control} label="Name" />
        <TextInput name="description" label="Description" control={control} />
      </CardContent>
      <CardFooter>
        <Button type="submit">Save</Button>
      </CardFooter>
    </Card>
  );
}
