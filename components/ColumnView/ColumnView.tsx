import FieldValue from "./FieldValue";

export type ColumnField<T, S = {}> =
  | keyof T
  | keyof S
  | {
      name: keyof T | keyof S;
      Comp?: any;
    };
export type ColumnViewProps<
  T extends { name: string },
  S extends Record<any, any> = {}
> = {
  sources: T[];
  state?: S;
  setState?: React.Dispatch<React.SetStateAction<S>>;
  fields?: ColumnField<T, S>[];
};
export function ColumnView<
  T extends { name: string },
  S extends Record<any, any> = {}
>({ sources, fields: _fields, state, setState }: ColumnViewProps<T, S>) {
  const fields = (_fields || [])
    .map<{ name: keyof T | keyof S; Comp?: any }>((f) =>
      typeof f !== "object" ? { name: f } : f
    )
    .map(({ Comp, ...f }) => ({ Comp: Comp ?? FieldValue, ...f }));
  return (
    <div className="grid grid-flow-row w-full">
      {fields.map(({ Comp, ...field }, i) => (
        <div
          key={i}
          className={`grid grid-cols-${(
            sources.length + 1
          ).toString()}  border-b-2 gap-2`}
        >
          <div className="uppercase border-r-4 py-2">
            {field.name.toString()}
          </div>
          {sources.map((src, j) => (
            <Comp
              value={src[field.name as keyof T]}
              key={j}
              src={src}
              name={field.name}
              setState={setState}
              state={state}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColumnView;
