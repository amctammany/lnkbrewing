"use client";
import InlineField from "@/components/Form/InlineField";
import { Select } from "@/components/Form/Select";
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
import { HopInput } from "@/schemas/IngredientSchemas";
import { HopType } from "@/types/Ingredient";
import { $Enums, User } from "@prisma/client";
import { Percent } from "lucide-react";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type HopEditorFormContainerProps<S = unknown> = {
  src: HopType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function HopEditorFormContainer({
  src,
  action,
  children,
}: HopEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  console.log(src);
  const form = useForm<HopType>({
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

export type HopEditorFormProps = {
  src: HopType;
  //  action: (formData: FormData) => Promise<void>;
};
export function HopEditorForm({}: HopEditorFormProps) {
  const { register, control } = useFormContext<HopType>();
  return (
    <Card className="m-4">
      <CardHeader className="border-b-4">
        <CardTitle>Hop Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("userId")} />
        <TextInput name="name" control={control} label="Name" />
        <TextInput name="description" label="Description" control={control} />
        <TextInput name="country" label="Country" control={control} />
        <SelectInput name="usage" options={$Enums.HopUsage} />
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InlineField
            name="alpha"
            type="number"
            step="0.1"
            label="Alpha"
            control={control}
          />
          <InlineField
            name="beta"
            type="number"
            step="0.1"
            label="Beta"
            control={control}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Save</Button>
      </CardFooter>
    </Card>
  );
}
