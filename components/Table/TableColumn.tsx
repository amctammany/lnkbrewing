export type TableColumnProps<
  T extends Record<string, any> = Record<string, any>
> = {
  name: keyof T;
  header?: string;
};

export function TableColumn<
  T extends Record<string, any> = Record<string, any>
>({ header }: TableColumnProps<T>) {
  return <th>{header}</th>;
}
