import { Form, Submit, TextArea } from "@/components";
import { prisma } from "@/lib/client";
import { Style } from "@prisma/client";
type StyleEditorProps = {
  params: {
    identifier: string;
  };
};
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
      <Form>
        {fieldNames.map((field) => (
          <TextArea key={field} name={field} defaultValue={style?.[field]} />
        ))}
        <Submit>Save</Submit>
      </Form>
      {JSON.stringify(style)}
    </div>
  );
}
