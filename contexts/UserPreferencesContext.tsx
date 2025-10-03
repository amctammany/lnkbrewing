"use client";
import { PercentUnitType } from "@/lib/Converter/UnitDict";
import { UserPreferences } from "@prisma/client";
import { createContext } from "react";
export type UserPreferencesType = Partial<
  Omit<UserPreferences, "percent"> & { percent: PercentUnitType }
>;
export const UserPreferencesContext = createContext<UserPreferencesType | null>(
  null
);
