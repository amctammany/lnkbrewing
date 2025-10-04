"use client";
import AmountField from "@/components/Form/AmountField";
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
import {
  UserPreferencesContext,
  UserPreferencesType,
} from "@/contexts/UserPreferencesContext";
import { YeastType } from "@/types/Ingredient";
import { $Enums } from "@prisma/client";
import { Percent } from "lucide-react";
import { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type YeastEditorFormContainerProps<S = unknown> = {
  src: YeastType;
  preferences: UserPreferencesType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function YeastEditorFormContainer({
  src,
  action,
  preferences,
  children,
}: YeastEditorFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<YeastType>({
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

export type YeastEditorFormProps = {
  src: YeastType;
  //  action: (formData: FormData) => Promise<void>;
};
export function YeastEditorForm({}: YeastEditorFormProps) {
  const { register, control } = useFormContext<YeastType>();
  return (
    <Card className="m-4">
      <CardHeader className="border-b-4">
        <CardTitle>Yeast Editor</CardTitle>
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
            <div className="md:grid md:grid-cols-2">
              <AmountField
                control={control}
                amountType="percent"
                name="attenuationLow"
                type="number"
                step="0.01"
                variant="grid"
                label="Min. Attenuation"
              />

              <AmountField
                control={control}
                amountType="percent"
                name="attenuationHigh"
                type="number"
                step="0.01"
                variant="grid"
                label="Max. Attenuation"
              />
            </div>

            <AmountField
              control={control}
              name="tolerance"
              step="0.01"
              type="number"
              amountType="percent"
              variant="grid"
              label="Tolerance"
            />
            <div className="md:grid md:grid-cols-2">
              <AmountField
                control={control}
                amountType="temperature"
                name="tempLow"
                step="0.1"
                type="number"
                label="Min Temp."
                variant="grid"
              />
              <AmountField
                control={control}
                amountType="temperature"
                name="tempHigh"
                step="0.1"
                type="number"
                label="Max Temp."
                variant="grid"
              />
            </div>
          </div>
          <div>
            <SelectInput
              name="type"
              control={control}
              label="Type"
              options={$Enums.YeastType}
              variant="grid"
            />
            <SelectInput
              name="form"
              control={control}
              label="Form"
              options={$Enums.YeastForm}
              variant="grid"
            />
            <SelectInput
              name="flocculation"
              control={control}
              label="Flocculation"
              options={$Enums.YeastFlocculation}
              variant="grid"
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
