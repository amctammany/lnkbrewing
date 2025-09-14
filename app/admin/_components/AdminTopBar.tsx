import { LinkButton } from "@/components/Button/LinkButton";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function AdminTopBar() {
  return (
    <header className="lg:sticky lg:top-0 lg:z-50 lg:w-full flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-sidebar-accent group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <LinkButton href="/admin">Dashboard</LinkButton>
        <LinkButton href="/admin/settings"> Settings</LinkButton>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <Button>Logout</Button>
      </div>
    </header>
  );
}
