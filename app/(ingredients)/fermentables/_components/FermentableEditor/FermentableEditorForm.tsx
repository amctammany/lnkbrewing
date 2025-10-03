"use client";
import InputField from "@/components/Form/InputField";
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
import { FermentableType } from "@/types/Ingredient";
//import { $Enums, User, Fermentable } from "@prisma/client";
import { Percent } from "lucide-react";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type FermentableEditorFormContainerProps<S = unknown> = {
  src: FermentableType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function FermentableEditorFormContainer({
  src,
  action,
  children,
}: FermentableEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<FermentableType>({
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

export type FermentableEditorFormProps = {
  src: FermentableType;
  //  action: (formData: FormData) => Promise<void>;
};
export function FermentableEditorForm({}: FermentableEditorFormProps) {
  const { register, control } = useFormContext<FermentableType>();
  return (
    <Card className="m-4">
      <CardHeader className="border-b-4">
        <CardTitle>Fermentable Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("userId")} />
        <TextInput name="name" control={control} label="Name" />
        <TextInput name="description" label="Description" control={control} />
        <TextInput name="manufacturer" label="Manufacturer" control={control} />
        <TextInput name="notes" label="Notes" control={control} />
        <div className="grid lg:grid-cols-2 gap-3 *:p-3 *:rounded *:ring-2 p-4 *:px-8">
          <div>
            <InputField
              name="potential"
              type="number"
              step="0.01"
              control={control}
              label="Potential"
              AppendIcon={Percent}
            />
            <InputField
              name="color"
              step="0.01"
              type="number"
              control={control}
              label="Color"
              AppendIcon={Percent}
            />
            <InputField
              name="maxUsage"
              step="0.1"
              type="number"
              control={control}
              label="Max Usage"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Save</Button>
      </CardFooter>
    </Card>
  );
}
