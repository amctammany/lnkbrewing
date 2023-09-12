export type RecipeEditorLayoutProps = {
  children: any;
  modal: any;
};
export default function RecipeEditorLayout({
  children,
  modal,
}: RecipeEditorLayoutProps) {
  return (
    <div className="min-w-full">
      {modal}

      {children}
    </div>
  );
}
