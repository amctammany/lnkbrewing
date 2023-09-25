"use client";
import {
  Form,
  Label,
  NumberField,
  //Select,
  Submit,
  //TextField,
} from "@/components";
import { EquipmentProfile, MassUnit, Recipe, TimeUnit } from "@prisma/client";
//import { EquipmentProfileSelect } from "@/app/profiles/_components";

export type EquipmentProfileFormProps = {
  src: Recipe | null;
  profiles: EquipmentProfile[];
  action?: (data: FormData) => void;
};

export function EquipmentProfileForm({
  src,
  profiles,
  action,
}: EquipmentProfileFormProps) {
  const options = profiles.reduce((acc, profile) => {
    acc[
      profile.id
    ] = `${profile.name}: ${profile.batchVolume} - ${profile.brewEfficiency}`;
    return acc;
  }, {} as Record<string, string>);
  const opts = Object.entries(options).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));

  const handleProfileSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const profile = profiles.find((p) => p.id === parseInt(e.target.value));
    console.log(profile);
  };
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <div>
        <Label label="Profile">
          <select
            onChange={handleProfileSelect}
            className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            name="equipmentProfileId"
            defaultValue={src?.equipmentProfileId || profiles[0].id}
          >
            {opts}
          </select>
        </Label>
      </div>
      <div>
        <NumberField
          name="batchVolume"
          step={0.01}
          label="Batch Volume"
          defaultValue={src?.batchVolume}
        />
      </div>
      <div>
        <NumberField
          name="boilVolume"
          step={0.01}
          label="Boil Volume"
          defaultValue={src?.boilVolume}
        />
      </div>

      <div>
        <NumberField
          name="boilTime"
          label="Boil Time"
          defaultValue={src?.boilTime}
        />
      </div>
      <Submit>Save</Submit>
    </Form>
  );
}
export default EquipmentProfileForm;
