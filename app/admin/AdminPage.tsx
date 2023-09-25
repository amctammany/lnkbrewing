import dynamic from "next/dynamic";
const AdminForm = dynamic(() => import("./AdminForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export type AdminPageProps = {
  src: any;
  action?: any;
  //children: React.ReactNode;
};
export const AdminPage = ({ src, action }: AdminPageProps) => {
  return (
    <div>
      <AdminForm src={src} action={action} />
    </div>
  );
};
export default AdminPage;
