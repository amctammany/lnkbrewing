import React from "react";
import AdminTopBar from "./_components/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminTopBar />
      {children}
    </div>
  );
}
