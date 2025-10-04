"use client";
import AmountField from "@/components/Form/AmountField";
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
import {
  UserPreferencesContext,
  UserPreferencesType,
} from "@/contexts/UserPreferencesContext";
import { FermentableType } from "@/types/Ingredient";
//import { $Enums, User, Fermentable } from "@prisma/client";
import { Percent } from "lucide-react";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type FermentableEditorFormContainerProps<S = unknown> = {
  src: FermentableType;
  preferences: UserPreferencesType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function FermentableEditorFormContainer({
  src,
  preferences,
  action,
  children,
}: FermentableEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<FermentableType>({
    defaultValues: src,
    errors: state?.errors,
  });

  return (
    <UserPreferencesContext value={preferences}>
      <Form {...form}>
        <form
          action={formAction}
          //        onSubmit={form.handleSubmit(handleAction)}
        >
          {children}
        </form>
      </Form>
    </UserPreferencesContext>
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
            <h4>Details</h4>

            <AmountField
              amountType="percent"
              name="maxUsage"
              step="0.1"
              type="number"
              label="Max Usage"
            />
            <AmountField
              amountType="percent"
              name="price"
              step="0.1"
              type="number"
              label="Price"
            />
          </div>
          <div>
            <h4>Properties</h4>
            <AmountField
              name="potential"
              step="0.001"
              type="number"
              label="Potential"
              amountType="gravity"
              unit="SG"
            />
            <AmountField
              name="yield"
              step="0.01"
              type="number"
              label="Yield"
              amountType="percent"
            />
            <AmountField
              name="color"
              step="0.01"
              type="number"
              label="Color"
              amountType="color"
            />
            <AmountField
              name="protein"
              step="0.01"
              type="number"
              label="Protein"
              amountType="percent"
            />
            <AmountField
              name="coarseFineDiff"
              step="0.01"
              type="number"
              label="Coarse Fine Diff"
              amountType="percent"
            />
            <AmountField
              name="power"
              step="0.01"
              type="number"
              label="Diastatic Power"
              amountType="percent"
            />
            <AmountField
              name="moisture"
              step="0.01"
              type="number"
              label="Moisture"
              amountType="percent"
            />
            <AmountField
              name="friability"
              step="0.01"
              type="number"
              label="Friability"
              amountType="percent"
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
