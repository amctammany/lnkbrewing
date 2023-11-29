import { TextField } from "./TextField";

export type AutocompleteProps = {
  name?: string;
};

export const Autocomplete = ({ name }: AutocompleteProps) => {
  return (
    <div>
      <TextField name="query" />
    </div>
  );
};
