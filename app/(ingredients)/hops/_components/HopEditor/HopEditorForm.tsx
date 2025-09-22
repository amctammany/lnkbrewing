"use client";
import InputField from "@/components/Form/InputField";
import RangeField from "@/components/Form/RangeField";
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
        <TextInput
          name="characteristics"
          label="Characteristics"
          control={control}
        />
        <SelectInput name="usage" options={$Enums.HopUsage} control={control} />
        <div className="grid grid-cols-1 ">
          <RangeField
            name="alphaRange"
            low="alphaLow"
            high="alphaHigh"
            median="alpha"
            label="Alpha Range"
            control={control}
          />

          <InputField
            name="beta"
            type="number"
            step="0.1"
            label="Beta"
            control={control}
          />
          <InputField
            name="bPinene"
            type="number"
            step="0.1"
            label="Beta Pinene"
            control={control}
          />
          <InputField
            name="caryophyllene"
            type="number"
            step="0.1"
            label="Caryophyllene"
            control={control}
          />
          <InputField
            name="cohumulone"
            type="number"
            step="0.1"
            label="Cohumulone"
            control={control}
          />
          <InputField
            variant="inline"
            name="farnesene"
            type="number"
            step="0.1"
            label="Farnesene"
            control={control}
          />
          <InputField
            variant="inline"
            name="geraniol"
            type="number"
            step="0.1"
            label="Gernaniol"
            control={control}
          />
          <InputField
            variant="inline"
            name="humulene"
            type="number"
            step="0.1"
            label="Humulene"
            control={control}
          />
          <InputField
            variant="inline"
            name="linalool"
            type="number"
            step="0.1"
            label="Linalool"
            control={control}
          />
          <InputField
            variant="inline"
            name="myrcene"
            type="number"
            step="0.1"
            label="Myrcene"
            control={control}
          />
          <InputField
            variant="inline"
            name="totalOil"
            type="number"
            step="0.1"
            label="Total Oil"
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
