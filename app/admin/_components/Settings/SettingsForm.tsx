"use client";
import RadioGroupInput from "@/components/Form/RadioGroupInput";
import SelectInput from "@/components/Form/SelectInput";
import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionalNullable } from "@/lib/utils";
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
import Link from "next/link";
import React, { startTransition, useActionState } from "react";
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
  const form = useForm<User>({ defaultValues: user, errors: state?.errors });

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

export type SettingsFormProps = {
  user: User;
  //  action: (formData: FormData) => Promise<void>;
};
export type UserType = User & { UserPreferences: UserPreferences };
export function SettingsForm({ user }: SettingsFormProps) {
  const { register, control } = useFormContext<UserType>();
  return (
    <div className="grid grid-cols-2 ">
      <div className="*:py-1">
        <input type="hidden" {...register("id")} />
        <TextInput label="Name" {...register("name")} />
        <TextInput label="Username" {...register("username")} />
        <TextInput label="Email" {...register("email")} />
      </div>
      <div className="*:py-1">
        <input type="hidden" {...register("UserPreferences.userId")} />
        <RadioGroupInput
          variant="inline"
          control={control}
          label="Mass System"
          name="UserPreferences.massSystem"
          options={MassSystem}
        />
        <RadioGroupInput
          variant="inline"
          control={control}
          label="Color"
          name="UserPreferences.color"
          options={UserColorPreference}
        />
        <RadioGroupInput
          variant="inline"
          control={control}
          label="Temperature"
          name="UserPreferences.temperature"
          options={UserTemperaturePreference}
        />
        <SelectInput
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
        />
        <SelectInput
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
