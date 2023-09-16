"use client";
import React, { FC } from "react";
import { useClickAway } from "@/hooks";
import { useRouter } from "next/navigation";

interface ClickAwayRouterProps {
  url: string;
  children: React.ReactNode | React.ReactNode[];
}

export const ClickAwayRouter: FC<ClickAwayRouterProps> = ({
  url,
  children,
}) => {
  const router = useRouter();
  const ref = useClickAway(() => router.replace(url, { scroll: false }));
  return <div ref={ref}>{children}</div>;
};
