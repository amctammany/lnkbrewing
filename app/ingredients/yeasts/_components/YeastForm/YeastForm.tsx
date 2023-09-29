import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import {
  Yeast,
  YeastForm as YeastFormEnum,
  YeastFlocculation,
  YeastType,
} from "@prisma/client";

export type YeastFormProps = {
  src: Yeast | null;
  action?: (data: FormData) => void;
};

export const YeastForm = ({ src, action }: YeastFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <TextField
        name="manufacturer"
        label="Manufacturer"
        defaultValue={src?.manufacturer}
      />
      <TextArea name="notes" label="notes" defaultValue={src?.notes} />
      <TextArea name="usage" label="Usage" defaultValue={src?.usage} />
      <div className="grid grid-cols-3 gap-4">
        <Select name="type" defaultValue={src?.type} options={YeastType} />
        <Select name="form" defaultValue={src?.form} options={YeastFormEnum} />
        <Select
          name="flocculation"
          defaultValue={src?.flocculation}
          options={YeastFlocculation}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NumberField
          name="attenuation"
          step={0.01}
          label="Attenuation"
          defaultValue={src?.attenuation}
        />
        <NumberField
          name="tempLow"
          label="Temp Low"
          defaultValue={src?.tempLow}
        />
        <NumberField
          name="tempHigh"
          label="Temp High"
          defaultValue={src?.tempHigh}
        />
      </div>

      <Submit>Update Yeast</Submit>
    </Form>
  );
};
