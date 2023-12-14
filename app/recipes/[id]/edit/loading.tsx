import { ExtendedRecipe } from "../../types";
import { Editor } from "./Editor";

export const Loading = ({ id }: { id?: number }) => (
  <div>
    Loading
    <Editor id={id ?? -1} />
  </div>
);

export default Loading;
