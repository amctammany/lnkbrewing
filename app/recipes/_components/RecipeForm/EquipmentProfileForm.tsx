"use client";
import { Form } from "@/components/Form/Form";
import { Label } from "@/components/Form/Label";
import { Submit } from "@/components/Form/Submit";
//import {
//Form,
//Label,
//NumberField,
////Select,
//Submit,
////TextField,
//} from "@/components";
import { type EquipmentProfile, type Recipe } from "@prisma/client";
import { useState } from "react";
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

  const [profileData, setProfileData] = useState({
    boilTime: src?.boilTime || 60,
    batchVolume: src?.batchVolume || 5,
    boilVolume: src?.boilVolume || 6,
  });
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setProfileData((old) => ({ ...old, [name]: parseFloat(value) }));
  };
  const handleProfileSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const profile = profiles.find((p) => p.id === parseInt(e.target.value));
    console.log(profile);
    setProfileData((old) => ({
      boilTime: profile?.boilTime || old.boilTime,
      boilVolume: profile?.boilVolume || old.boilVolume,
      batchVolume: profile?.batchVolume || old.batchVolume,
    }));
  };
  return (
    <Form action={action}>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3">
        <input type="hidden" name="id" value={src?.id} />
        <div className="col-span-3">
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
          <Label label="Batch Volume">
            <input
              type="number"
              className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              name="batchVolume"
              step={0.01}
              value={profileData.batchVolume}
              onChange={handleChange}
            />
          </Label>
        </div>
        <div>
          <Label label="Boil Volume">
            <input
              type="number"
              className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              name="boilVolume"
              step={0.01}
              value={profileData.boilVolume}
              onChange={handleChange}
            />
          </Label>
        </div>
        <div>
          <Label label="Boil Time">
            <input
              type="number"
              name="boilTime"
              className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              step={1}
              value={profileData.boilTime}
              onChange={handleChange}
            />
          </Label>
        </div>

        <Submit>Save</Submit>
      </div>
    </Form>
  );
}
export default EquipmentProfileForm;
