"use client";
import HistoryForm from "@/components/Form/HistoryForm";
import RadioGroupInput from "@/components/Form/RadioGroupInput";
import SelectInput from "@/components/Form/SelectInput";
import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RevisionContext } from "@/contexts/RevisionContext";
import useRevisionHistory from "@/hooks/useRevisionHistory";
import { get } from "@/lib/utils";

import {
  UserGravityPreference,
  User,
  UserPreferences,
  UserPressurePreference,
  UserTemperaturePreference,
  UserMassPreference,
  MassSystem,
  UserColorPreference,
  UserVolumePreference,
} from "@prisma/client";
import React, { useActionState, useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type SettingsFormContainerProps<S = unknown> = {
  user: User;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function SettingsContainerForm({
  user,
  action,
  children,
}: SettingsFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<UserType>({
    defaultValues: user,
    errors: state?.errors,
  });
  const revision = useRevisionHistory<UserType>(
    form.getValues() as any,
    form.setValue as any
  );

  return (
    <HistoryForm formProps={form} historyProps={revision}>
      <form
        action={formAction}
        //        onSubmit={form.handleSubmit(handleAction)}
      >
        {children}
      </form>
    </HistoryForm>
  );
}

export type SettingsFormProps = {
  user: User;
  //  action: (formData: FormData) => Promise<void>;
};
export type UserType = User & { UserPreferences: UserPreferences };
export function SettingsForm({ user }: SettingsFormProps) {
  const { register, control, getValues, formState } =
    useFormContext<UserType>();
  const {
    state,
    undo,
    redo,
    handleRedo,
    handleUndo,
    updateHistory,
    canRedo,
    canUndo,
    update,
  } = useContext(RevisionContext)!;
  return (
    <div className="grid grid-cols-2 ">
      <div className="*:py-1">
        <input type="hidden" {...register("id")} />
        <TextInput label="Name" {...register("name")} onBlur={updateHistory} />
        <TextInput
          label="Username"
          {...register("username")}
          onBlur={updateHistory}
        />
        <TextInput
          label="Email"
          {...register("email")}
          onBlur={updateHistory}
        />
      </div>
      <div className="*:py-1">
        <input type="hidden" {...register("UserPreferences.userId")} />
        <RadioGroupInput
          variant="inline"
          control={control}
          label="Mass System"
          name="UserPreferences.massSystem"
          onBlur={updateHistory}
          options={MassSystem}
        />
        <RadioGroupInput
          variant="inline"
          onBlur={updateHistory}
          control={control}
          label="Color"
          name="UserPreferences.color"
          options={UserColorPreference}
        />
        <RadioGroupInput
          variant="inline"
          onBlur={updateHistory}
          control={control}
          label="Temperature"
          name="UserPreferences.temperature"
          options={UserTemperaturePreference}
        />
        <SelectInput
          onBlur={updateHistory}
          variant="grid"
          control={control}
          label="Volume"
          name="UserPreferences.volume"
          options={UserVolumePreference}
        />
        <SelectInput
          variant="grid"
          control={control}
          label="Gravity"
          name="UserPreferences.gravity"
          options={UserGravityPreference}
          onBlur={updateHistory}
        />
        <SelectInput
          onBlur={updateHistory}
          variant="grid"
          control={control}
          name="UserPreferences.pressure"
          label="Pressure"
          options={UserPressurePreference}
        />

        <SelectInput
          variant="grid"
          control={control}
          label="Mass"
          name="UserPreferences.mass"
          options={UserMassPreference}
        />

        <SelectInput
          variant="grid"
          control={control}
          label="Fermentable Mass"
          name="UserPreferences.fermentableMass"
          options={UserMassPreference}
        />
        <SelectInput
          variant="grid"
          control={control}
          label="Hop Mass"
          name="UserPreferences.hopMass"
          options={UserMassPreference}
        />
      </div>
      <Button type="submit">Save</Button>
    </div>
  );
}

/**
 *  <FormField
        control={control}
        name="UserPreferences.gravity"
        render={({ field }) => (
          <FormItem className="grid grid-cols-2">
            <FormLabel className="text-left">Gravity</FormLabel>
            <FormControl className="mx-auto justify-items-center">
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-0 *:not-last:border-r-4 border-black rounded-lg border-2"
              >
                {Object.entries(UserGravityPreference).map(([key, value]) => (
                  <FormItem key={key} className="flex items-center gap-1">
                    <FormControl>
                      <Label className="px-4 py-2 cursor-pointer has-checked:bg-blue-500 has-checked:text-white">
                        <RadioGroupItem value={key} className="hidden peer" />
                        {value}
                      </Label>
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>

            <FormDescription>
              <Link href="/examples/forms">{field.value}email settings</Link>.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
 
 */
