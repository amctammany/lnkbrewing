"use client";
import useRevisionHistory from "@/hooks/useRevisionHistory";
import { createContext } from "react";
/** 
   * 
  Omit<UserPreferences, "percent"> & { percent: PercentUnitType }
>;
  */
export const RevisionContext = createContext<ReturnType<
  typeof useRevisionHistory<any>
> | null>(null);
