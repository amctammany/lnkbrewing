import { TrashIcon } from "@heroicons/react/24/solid";

export type RemoveButtonProps = {
  id?: number;
  action?: any;
};
export const RemoveButton = ({ id, action }: RemoveButtonProps) => {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
};
