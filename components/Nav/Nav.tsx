export type NavProps = {
  children: React.ReactNode;
};

export const Nav = ({ children }: NavProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex-auto bg-red-100">
      {children}
    </nav>
  );
};
