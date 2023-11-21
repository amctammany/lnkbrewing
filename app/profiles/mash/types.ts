import { MashProfile, MashStep } from "@prisma/client";

export type MashProfileStep = {
  name?: string | null;
  //type?: any;
  temperature: number;
  time: number;
  rampTime: number;
};
export type MashProfileInput = MashProfile & {
  steps: MashProfileStep[];
  //steps: Exclude<MashStep, "mashProfileId" | "id">[];
};
