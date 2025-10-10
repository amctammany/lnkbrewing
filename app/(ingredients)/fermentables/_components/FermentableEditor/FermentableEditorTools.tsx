"use client";
import IconButton from "@/components/Button/IconButton";
import { RevisionContext } from "@/contexts/RevisionContext";
import { Redo, Save, Undo } from "lucide-react";
import React, { useContext } from "react";

export default function FermentableEditorTools() {
  const ctx = useContext(RevisionContext);
  return (
    <>
      <IconButton
        icon={Undo}
        onClick={ctx?.handleUndo}
        disabled={!ctx?.canUndo}
      >
        Undo
      </IconButton>
      <IconButton
        icon={Redo}
        onClick={ctx?.handleRedo}
        disabled={!ctx?.canRedo}
      >
        Redo
      </IconButton>
      <IconButton icon={Save} type="submit">
        Save
      </IconButton>
    </>
  );
}
