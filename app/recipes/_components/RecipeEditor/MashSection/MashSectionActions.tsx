"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { useRecipe } from "../useRecipe";
import { EditIcon } from "@/components/Icon/EditIcon";

export const MashSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button onClick={() => openModal("mash")}>
        <EditIcon />
      </Button>
    </div>
  );
};
