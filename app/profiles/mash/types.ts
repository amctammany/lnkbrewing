import { MashProfile, MashStep } from "@prisma/client";

export type MashProfileStep = {
  name?: string | null;
  type?: any;
  temperature: number;
  time: number;
  rampTime?: number;
  mashProfileId: number;
};
export type MashProfileInput = MashProfile & {
  steps: Exclude<MashStep, "mashProfileId">[];
};
