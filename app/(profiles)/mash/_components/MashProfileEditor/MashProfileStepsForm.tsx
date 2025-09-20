"use client";
import InlineField from "@/components/Form/InlineField";
import { InlineInput } from "@/components/Form/InlineInput";
import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { MashProfileType } from "@/types/Profile";
import { MashProfile } from "@prisma/client";
import React, { useActionState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

export function MashProfileStepsForm({ src }: { src: MashProfileType }) {
  const { register, control } = useFormContext<MashProfileType>();
  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: "steps",
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Steps</CardTitle>
        <CardAction>
          <Button
            onClick={(e) => {
              e.preventDefault();
              append({
                index: fields.length + 1,
                mashProfileId: src.id,
                type: "infusion",
                time: 0,
                temperature: 0,
                rampTime: 0,
              });
              return false;
            }}
          >
            Add
          </Button>
        </CardAction>
      </CardHeader>
      <ul>
        {fields.map((step, index) => (
          <li className="list-item" key={index}>
            <b>{index}</b>
            <b>{step.type}</b>
            <input type="hidden" name={`steps.${index}.index`} value={index} />
            <input type="hidden" name={`steps.${index}.id`} />
            <InlineField
              control={control}
              name={`steps.${index}.temperature`}
              type="number"
              label="Temp"
            />
            <InlineField
              control={control}
              name={`steps.${index}.time`}
              type="number"
              label="Time"
            />
            <InlineField
              control={control}
              name={`steps.${index}.rampTime`}
              type="number"
              label="Ramp Time"
            />
            <Button
              onClick={(e) => {
                remove(index);
                e.preventDefault();
              }}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
