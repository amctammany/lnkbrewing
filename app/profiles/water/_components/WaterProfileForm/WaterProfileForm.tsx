"use client";
import { Form, Submit, TextArea, TextField } from "@/components/Form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createWaterProfile, updateWaterProfile } from "@/app/profiles/actions";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { AmountField } from "@/components/Form/AmountField";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
import { SaveIcon } from "@/components/Icon";
type WaterProfileInput = any;

export type WaterProfileFormProps = {
  src: WaterProfileInput | null;
};
export const WaterProfileForm = ({ src }: WaterProfileFormProps) => {
  const { control, register, trigger } = useForm<WaterProfileInput>({
    defaultValues: { ...src, steps: src?.steps ?? [] },
  });
  const action = src?.id ? updateWaterProfile : createWaterProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Section title={`Editing WaterProfile: ${src?.name}`}>
      <Form action={onSubmit}>
        <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
          <input type="hidden" {...register("id")} />
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("description")} label="Description" />
          </div>
          <div className="col-span-3 md:col-span-6 grid grid-cols-3 lg:grid-cols-6">
            <AmountField
              {...register("calcium")}
              label={<Ca2 />}
              amountType="ppm"
            />

            <AmountField
              {...register("magnesium")}
              label={<MgSo4 />}
              amountType="ppm"
            />
            <AmountField
              {...register("sodium")}
              label={<Na />}
              amountType="ppm"
            />
            <AmountField
              {...register("chloride")}
              label={<Cl />}
              amountType="ppm"
            />
            <AmountField
              {...register("sulfate")}
              label={<SO4 />}
              amountType="ppm"
            />
            <AmountField
              {...register("bicarbonate")}
              label={<HCO3 />}
              amountType="ppm"
            />
          </div>
        </div>
        <Toolbar>
          <IconButton Icon={SaveIcon} type="submit">
            Save
          </IconButton>
        </Toolbar>
      </Form>
    </Section>
  );
};
