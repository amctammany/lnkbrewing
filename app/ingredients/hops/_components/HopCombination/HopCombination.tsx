import React from "react";
//import HopPanel from "./HopPanel";
import { Hop } from "@prisma/client";
import { CompareField, CompareTable } from "@/components/CompareTable";
import { Section } from "@/components/Section";
import { Form } from "@/components/Form/Form";
import { useForm } from "react-hook-form";
export type HopCombinationProps = {
  hops: Hop[];
  action: any;
};

const compFields: CompareField<Hop>[] = [
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
        <CompareTable sources={hops} fields={compFields} />
      </Form>
    </Section>
  );
}

export default HopCombination;
