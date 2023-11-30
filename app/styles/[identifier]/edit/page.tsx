import { Form, Submit, TextArea, TextField } from "@/components/Form";
import { prisma } from "@/lib/client";
import { update } from "../../actions";
import { Style } from "@prisma/client";
type StyleEditorProps = {
  params: {
    identifier: string;
  };
};

export function generateMetadata({ params }: StyleEditorProps) {
  return {
    title: `LNK Style ${params.identifier} - Edit`,
  };
}
const fieldNames: (keyof Style)[] = [
  "aroma",
  "appearance",
  "flavor",
  "mouthfeel",
  "history",
  "ingredients",
  "comments",
  "comparison",
  "examples",
];

export default async function StyleEditor({
  params: { identifier },
}: StyleEditorProps) {
  const style = await prisma.style.findFirst({
    where: {
      identifier,
    },
  });
  return (
    <div className="m-5 p-5 bg-slate-200">
      <h2 className="text-2xl">Style Editor: {style?.name}</h2>
      <Form action={update}>
        <input type="hidden" name="id" value={style?.id} />
        <TextField name="name" defaultValue={style?.name} />
        <TextField name="identifier" defaultValue={style?.identifier} />
        {fieldNames.map((field) => (
          <TextArea key={field} name={field} defaultValue={style?.[field]} />
        ))}
        <Submit>Save</Submit>
      </Form>
    </div>
  );
}
