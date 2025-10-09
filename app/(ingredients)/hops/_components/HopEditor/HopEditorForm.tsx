"use client";
import InputField from "@/components/Form/InputField";
import RangeField from "@/components/Form/RangeField";
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
import { HopType } from "@/types/Ingredient";
import { $Enums } from "@prisma/client";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <RangeField
            name="alphaRange"
            low="alphaLow"
            high="alphaHigh"
            median="alpha"
            label="Alpha Range"
            control={control}
          />
          <RangeField
            name="betaRange"
            low="betaLow"
            high="betaHigh"
            median="beta"
            label="Beta Range"
            control={control}
          />
          <RangeField
            name="cohumoloneRange"
            low="cohumuloneLow"
            high="cohumuloneHigh"
            median="cohumulone"
            label="Cohumulone Range"
            control={control}
          />
          <RangeField
            name="linaloolRange"
            low="linaloolLow"
            high="linaloolHigh"
            median="linalool"
            label="Linalool Range"
            control={control}
          />
          <RangeField
            name="caryophylleneRange"
            low="caryophylleneLow"
            high="caryophylleneHigh"
            median="caryophyllene"
            label="Caryophyllene Range"
            control={control}
          />
          <RangeField
            name="bPineneRange"
            low="bPineneLow"
            high="bPineneHigh"
            median="bPinene"
            label="b-Pinene Range"
            control={control}
          />
          <RangeField
            name="farneseneRange"
            low="farneseneLow"
            high="farneseneHigh"
            median="farnesene"
            label="Farnesene Range"
            control={control}
          />
          <RangeField
            name="myrceneRange"
            low="myrceneLow"
            high="myrceneHigh"
            median="myrcene"
            label="Myrcene Range"
            control={control}
          />
          <RangeField
            name="humuleneRange"
            low="humuleneLow"
            high="humuleneHigh"
            median="humulene"
            label="Humulene Range"
            control={control}
          />
          <RangeField
            name="geraniolRange"
            low="geraniolLow"
            high="geraniolHigh"
            median="geraniol"
            label="Geraniol Range"
            control={control}
          />

          <RangeField
            name="totalOilRange"
            low="totalOilLow"
            high="totalOilHigh"
            median="totalOil"
            label="Total Oil Range"
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
