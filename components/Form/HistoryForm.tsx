import {
  RevisionContext,
  RevisionContextType,
} from "@/contexts/RevisionContext";
import React from "react";
import { FieldValues, FormProviderProps } from "react-hook-form";
import { Form } from "../ui/form";

export type HistoryFormProps<T extends FieldValues = any> = {
  formProps: Omit<FormProviderProps<T>, "children">;
  children: React.ReactNode | React.ReactNode[];
  historyProps: RevisionContextType<T>;
};

export default function HistoryForm({
  children,
  formProps,
  historyProps,
}: HistoryFormProps) {
  return (
    <Form {...formProps}>
      <RevisionContext value={historyProps}>{children}</RevisionContext>
    </Form>
  );
}
