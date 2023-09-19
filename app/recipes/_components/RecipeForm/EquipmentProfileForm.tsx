import { Form, NumberField, Select, Submit, TextField } from "@/components";
import { EquipmentProfile, MassUnit, Recipe, TimeUnit } from "@prisma/client";
import { EquipmentProfileSelect } from "@/app/profiles/_components";

export type EquipmentProfileFormProps = {
  src: Recipe | null;
  action?: (data: FormData) => void;
};

export async function EquipmentProfileForm({
  src,
  action,
}: EquipmentProfileFormProps) {
  console.log(src);
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <div>
        <EquipmentProfileSelect
          name="equipmentProfileId"
          label="Equipment"
          value={src?.equipmentProfileId}
        />
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
