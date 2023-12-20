import { MashProfile, MashStep, MashStepType } from "@prisma/client";

export type MashProfileStep = {
  name?: string | null;
  type: MashStepType;
  temperature: number;
  time: number;
  rampTime: number;
};
export type MashProfileInput = MashProfile & {
  steps: MashProfileStep[];
  //steps: Exclude<MashStep, "mashProfileId" | "id">[];
};
