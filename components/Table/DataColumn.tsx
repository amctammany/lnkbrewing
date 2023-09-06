export type DataColumnProps<
  T extends Record<string, any> = Record<string, any>
> = {
  name: keyof T;
  header?: string;
  href?: string | ((src: T) => string);
};

export function DataColumn<
  T extends Record<string, any> = Record<string, any>
>({ header }: DataColumnProps<T>) {
  return <th>{header}</th>;
}
