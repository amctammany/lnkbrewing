"use client";
import React, { useState } from "react";
//import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
import { Section } from "@/components/Section";
import { Form } from "@/components/Form/Form";
import { useForm } from "react-hook-form";
import ColumnView, { ColumnField } from "@/components/ColumnView/ColumnView";
import FieldValue from "@/components/ColumnView/FieldValue";
import { TextField } from "@/components";
export type HopCombinationProps = {
  hops: Hop[];
  action: any;
};

const Radio = ({ name, src, state, setState }) => {
  console.log({ name, src, state });
  return <input type="radio" name={name} />;
};
const SelectField = ({ name, src, state, setState }) => {
  const isSelected = state.selected === src.id;
  const value = src[name];
  const handleSelect: React.ReactEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
    setState((old) => ({ ...old, selected: src.id }));
  };
  return (
    <input name={name} onClick={handleSelect} value={src.id} type="radio" />
  );
};

const EditFieldValue = ({ name, src, state, setState }) => {
  const value = src[name];
  return <TextField name={name} value={value} />;
};
const EditField = ({ name, src, state, setState }) => {
  const value = src[name];
  const isSelected = state.selected === src.id;
  const Comp = isSelected ? EditFieldValue : FieldValue;
  return (
    <Comp
      name={name}
      value={value}
      src={src}
      state={state}
      setState={setState}
    />
  );
};
const compFields: ColumnField<Hop, { selected: number | null }>[] = [
  "name",
  { name: "selected", Comp: SelectField },
  { name: "country", Comp: EditField },
  "characteristics",
  "usage",
  "alpha",
  "beta",
  "styles",
];
export function HopCombination({ hops, action }: HopCombinationProps) {
  const { trigger } = useForm();
  const onAction = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    if (action) action(data);
  };
  const [state, setState] = useState({ selected: null });

  return (
    <Section header="Hop Comparision">
      <Form action={onAction}>
        <ColumnView
          sources={hops}
          fields={compFields}
          state={state}
          setState={setState}
        />
      </Form>
    </Section>
  );
}

export default HopCombination;
