"use client";
import { UserPreferences } from "@prisma/client";
import { createContext } from "react";
export type UserPreferencesType = Partial<
  Omit<UserPreferences, "id" | "userId" | "updatedAt" | "createdAt">
>;
export const UserPreferencesContext =
  createContext<Partial<UserPreferences> | null>(null);
