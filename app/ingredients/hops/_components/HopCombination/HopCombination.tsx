import React from "react";
//import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
import { Section } from "@/components/Section";
import { Form } from "@/components/Form/Form";
import { useForm } from "react-hook-form";
import ColumnView, { ColumnField } from "@/components/ColumnView/ColumnView";
export type HopCombinationProps = {
  hops: Hop[];
  action: any;
};

const compFields: ColumnField<Hop>[] = [
  "name",
  "country",
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

  return (
    <Section header="Hop Comparision">
      <Form action={onAction}>
        <ColumnView sources={hops} fields={compFields} />
      </Form>
    </Section>
  );
}

export default HopCombination;
