import { ReactElement } from "react";

export type CompareField<T> = {
  name: keyof T;
};
export type CompareTableProps<T extends { name: string }> = {
  sources: T[];
  fields?: CompareField<T>[];
};
export function CompareTable<T extends { name: string }>({
  sources,
  fields,
}: CompareTableProps<T>) {
  const colClass = `grid grid-flow-col auto-cols-auto w-full grid-cols-${
    sources.length + 1
  }`;
  return (
    <div className="grid grid-flow-row  auto-rows-auto">
      <div className={colClass}>
        <div></div>
        {sources.map((src, i) => (
          <div key={i}>{src.name}</div>
        ))}
      </div>
      {fields?.map((field, i) => (
        <div key={i} className={colClass}>
          <div className="w-full">{field.name.toString()}</div>
          {sources.map((src, j) => (
            <div className="w-full" key={j}>
              {src[field.name] as string}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  /**
  return (
    <div className="max-w-full overflow-auto">
      <div
        className={`grid grid-flow-row auto-cols-auto grid-rows-${
          (fields || []).length + 1
        } grid-cols-${sources.length + 1}`}
      >
        <div className="">
          <div></div>
          {sources.map((src, j) => (
            <div key={j}>{src.name}</div>
          ))}
        </div>
        {fields?.map((field, i) => (
          <div key={i} className="">
            <div className="">{field.name.toString()}</div>
            {sources.map((src, j) => (
              <div className="" key={j}>
                {src[field.name].toString()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="max-w-full overflow-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Field</th>
            {sources.map((src, j) => (
              <th key={j}>{src.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields?.map((field, i) => (
            <tr key={i} className="gap-3 border-b-2">
              <td className="">{field.name.toString()}</td>
              {sources.map((src, j) => (
                <td className="" key={j}>
                  {src[field.name].toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="flex ">
      <div className="shrink pr-4">
        <div className="grid grid-flow-row auto-rows-max">
          {fields?.map((f, i) => (
            <div key={i}>{f.name.toString()}</div>
          ))}
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-auto gap-4">
        {sources.map((src, i) => (
          <div key={i} className="grid grid-flow-row auto-rows-max">
            {fields?.map((f, j) => (
              <div key={j}>{src[f.name]?.toString()}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
   */
}

export default CompareTable;
