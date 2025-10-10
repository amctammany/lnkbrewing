"use client";
import HistoryForm from "@/components/Form/HistoryForm";
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
import {
  UserPreferencesContext,
  UserPreferencesType,
} from "@/contexts/UserPreferencesContext";
import useRevisionHistory from "@/hooks/useRevisionHistory";
import { HopType } from "@/types/Ingredient";
import { $Enums } from "@prisma/client";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type HopEditorFormContainerProps<S = unknown> = {
  src: HopType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  preferences: UserPreferencesType;
  children: React.ReactNode;
};
export function HopEditorFormContainer({
  src,
  preferences,
  action,
  children,
}: HopEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<HopType>({
    defaultValues: src,
    errors: state?.errors,
  });
  const historyCtx = useRevisionHistory<HopType>(
    form.getValues() as any,
    form.setValue as any
  );

  return (
    <UserPreferencesContext value={preferences}>
      <HistoryForm formProps={form} historyProps={historyCtx}>
        <form
          action={formAction}
          //        onSubmit={form.handleSubmit(handleAction)}
        >
          {children}
        </form>
      </HistoryForm>
    </UserPreferencesContext>
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
        <div className="grid grid-cols-1 lg:grid-cols-1 ">
          <RangeField
            name="alphaRange"
            low="alphaLow"
            high="alphaHigh"
            median="alpha"
            label="Alpha Range"
            min={0}
            max={60}
            control={control}
          />
          <RangeField
            name="betaRange"
            low="betaLow"
            high="betaHigh"
            median="beta"
            label="Beta Range"
            min={0}
            max={40}
            control={control}
          />
          <RangeField
            name="cohumoloneRange"
            low="cohumuloneLow"
            high="cohumuloneHigh"
            median="cohumulone"
            label="Cohumulone Range"
            control={control}
            min={0}
            max={50}
          />
          <RangeField
            name="linaloolRange"
            low="linaloolLow"
            high="linaloolHigh"
            median="linalool"
            label="Linalool Range"
            control={control}
            min={0}
            max={20}
          />
          <RangeField
            name="caryophylleneRange"
            low="caryophylleneLow"
            high="caryophylleneHigh"
            median="caryophyllene"
            label="Caryophyllene Range"
            control={control}
            min={0}
            max={20}
          />
          <RangeField
            name="bPineneRange"
            low="bPineneLow"
            high="bPineneHigh"
            median="bPinene"
            label="b-Pinene Range"
            control={control}
            min={0}
            max={10}
          />
          <RangeField
            name="farneseneRange"
            low="farneseneLow"
            high="farneseneHigh"
            median="farnesene"
            label="Farnesene Range"
            control={control}
            min={0}
            max={40}
          />
          <RangeField
            name="myrceneRange"
            low="myrceneLow"
            high="myrceneHigh"
            median="myrcene"
            label="Myrcene Range"
            control={control}
            min={0}
            max={80}
          />
          <RangeField
            name="humuleneRange"
            low="humuleneLow"
            high="humuleneHigh"
            median="humulene"
            label="Humulene Range"
            min={0}
            max={30}
            control={control}
          />
          <RangeField
            name="geraniolRange"
            low="geraniolLow"
            high="geraniolHigh"
            median="geraniol"
            label="Geraniol Range"
            min={0}
            max={20}
            control={control}
          />

          <RangeField
            name="totalOilRange"
            low="totalOilLow"
            high="totalOilHigh"
            median="totalOil"
            label="Total Oil Range"
            min={0}
            max={10}
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
