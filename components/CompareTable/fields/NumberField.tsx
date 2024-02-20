export type NumberFieldProps<T> = {
  name: keyof T;
  source?: T;
};
export function NumberField<T>({ name, source }: NumberFieldProps<T>) {
  return (
    <div>
      <b>{name.toString()}</b>
      <b>{source?.[name]?.toString()}</b>
    </div>
  );
}

export default NumberField;
