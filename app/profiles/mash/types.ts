import {
  MashProfile,
  MashStep,
  MashStepCreateWithoutMashProfileInput,
} from "@prisma/client";

export type MashProfileStep = {
  name?: string | null;
  type?: any;
  temperature: number;
  time: number;
  rampTime?: number;
};
export type MashProfileInput = MashProfile & {
  steps: MashStep[];
};
