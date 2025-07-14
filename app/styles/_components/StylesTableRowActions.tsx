import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import slugify from "slugify";
//import { removeStyle } from "@/app/styles/actions";
import Link from "next/link";
import { RemoveButton } from "@/components/RemoveButton";

export function StylesTableRowActions<T>({ row }: CellContext<T, unknown>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-auto w-full text-center" asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={`/styles/${slugify(row.getValue("name"), {
              lower: true,
            })}/fork`}
          >
            <span>Fork</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <RemoveButton
            name="slug"
            id={slugify(row.getValue("name"), { lower: true })}
            // eslint-disable-next-line
            action={(e: any) => console.log(e)}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
