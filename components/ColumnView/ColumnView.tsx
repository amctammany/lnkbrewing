import FieldValue from "./FieldValue";

export type ColumnField<T, S = {}> =
  | keyof T
  | keyof S
  | {
      name: keyof T | keyof S;
    };
export type ColumnViewProps<
  T extends { name: string },
  S extends Record<any, any> = {}
> = {
  sources: T[];
  state?: S;
  fields?: ColumnField<T, S>[];
};
export function ColumnView<
  T extends { name: string },
  S extends Record<any, any> = {}
>({ sources, fields: _fields, state }: ColumnViewProps<T, S>) {
  const fields = (_fields || []).map<{ name: keyof T | keyof S }>((f) =>
    typeof f !== "object" ? { name: f } : f
  );
  return (
    <div className="grid grid-flow-row w-full">
      {(fields || []).map((field, i) => (
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
            <FieldValue value={src[field.name as keyof T]} key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColumnView;
