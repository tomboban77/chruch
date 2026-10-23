"use client";

import { ArrowRight } from "lucide-react";
import { useToast } from "./Toast";

/** Placeholder until the church chooses an online giving provider. */
export function OnlineGiving() {
  const toast = useToast();
  return (
    <button type="button" className="btn btn-primary mt-1" onClick={() => toast("The online giving link will be added before launch")}>
      Give online <ArrowRight aria-hidden />
    </button>
  );
}
