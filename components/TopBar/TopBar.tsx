import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export type BreadCrumb = {
  title: string;
  url?: string;
  isCurrent?: boolean;
};
export function TopBar({
  breadcrumbs = [],
  children,
}: {
  breadcrumbs: BreadCrumb[];
  children?: React.ReactNode;
}) {
  const crumbs = breadcrumbs.slice(0, -1);
  const final = breadcrumbs[breadcrumbs.length - 1];
  return (
    <header className="lg:sticky lg:top-0 lg:z-50 lg:w-full flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-sidebar-accent group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb) => (
              <React.Fragment key={crumb.title}>
                <BreadcrumbItem className="idden dlock">
                  <BreadcrumbLink href={crumb.url ? crumb.url : "#"}>
                    {crumb.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hiden md:bloc" />
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{final.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">{children}</div>
    </header>
  );
}
