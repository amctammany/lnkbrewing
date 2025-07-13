import { Style } from "@/generated/prisma";
import React from "react";
export interface StylesTableProps {
  src?: Style[];
}
export const StylesTable: React.FC<StylesTableProps> = ({ src }) => {
  return (
    <div>
      {(src ?? []).map((style) => {
        return <div key={style.id}>{style.name}</div>;
      })}
    </div>
  );
};
export default StylesTable;
