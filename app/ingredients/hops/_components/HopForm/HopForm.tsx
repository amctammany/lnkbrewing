"use client";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Select } from "@/components/Form/Select";
import { Range } from "@/components/Range";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { NumberKeys } from "@/lib/types";
import { type Hop, HopUsage } from "@prisma/client";
import { useForm } from "react-hook-form";

export type HopFormProps = {
  src: Hop | null;
  action?: (data: FormData) => void;
};

export const HopForm = ({ src, action }: HopFormProps) => {
  const { control, watch, register, trigger, getValues } = useForm<Hop>({
    defaultValues: src || {},
  });

  const onAction = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    if (action) action(data);
  };
  const RangeEditor = ({
    low,
    median,
    high,
    label,
    min,
    max,
  }: {
    label?: string;
    min?: number;
    max?: number;
    low: NumberKeys<Hop>;
    median: NumberKeys<Hop>;
    high: NumberKeys<Hop>;
  }) => {
    //const [wLow, wMed, wHigh] = watch([low, median, high]);
    const [wLow, wMed, wHigh] = [src?.[low], src?.[median], src?.[high]];
    return (
      <fieldset className="border border-black p-4 grid grid-cols-3 gap-1">
        <legend>{label}</legend>

        <NumberField
          label="Low"
          {...register(low, { valueAsNumber: true })}
          step={0.01}
        />
        <NumberField
          label="Median"
          {...register(median, { valueAsNumber: true })}
          step={0.01}
        />
        <NumberField
          label="High"
          {...register(high, { valueAsNumber: true })}
          step={0.01}
        />
        <Range
          className="col-span-3"
          range={[wLow!, wHigh!]}
          min={min ?? 0}
          max={max ?? 100}
          value={wMed!}
        />
      </fieldset>
    );
  };
  return (
    <Section title={`Editing Hop: ${src?.name}`}>
      <Form action={onAction}>
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextField label="Country" {...register("country")} />
        <TextArea label="description" {...register("description")} />
        <Select {...register("usage")} options={HopUsage} />
        <TextArea label="flavor" {...register("flavor")} />
        <div className="grid grid-cols-3 gap-4">
          <RangeEditor
            label="Alpha Acids"
            low="alphaLow"
            median="alpha"
            high="alphaHigh"
            min={0}
            max={35}
          />
          <RangeEditor
            label="Beta Acids"
            low="betaLow"
            median="beta"
            high="betaHigh"
            min={0}
            max={25}
          />
          <RangeEditor
            label="Caryophyllene"
            low="caryophylleneLow"
            median="caryophyllene"
            high="caryophylleneHigh"
            min={0}
            max={75}
          />
          <RangeEditor
            label="Farnesene"
            low="farneseneLow"
            median="farnesene"
            high="farneseneHigh"
            min={0}
            max={35}
          />
          <RangeEditor
            label="Humulene"
            low="humuleneLow"
            median="humulene"
            high="humuleneHigh"
            min={0}
            max={35}
          />
          <RangeEditor
            label="Myrcene"
            low="myrceneLow"
            median="myrcene"
            high="myrceneHigh"
            min={0}
            max={85}
          />
          <RangeEditor
            label="Total Oil"
            low="totalOilLow"
            median="totalOil"
            high="totalOilHigh"
            min={0}
            max={15}
          />
          <RangeEditor
            label="Geraniol"
            low="geraniolLow"
            median="geraniol"
            high="geraniolHigh"
          />

          <RangeEditor
            label="Other"
            low="otherLow"
            median="other"
            high="otherHigh"
          />
        </div>

        <Toolbar className="col-span-3 m-0 p-0">
          <Button type="submit">Submit</Button>
        </Toolbar>
      </Form>
    </Section>
  );
};
