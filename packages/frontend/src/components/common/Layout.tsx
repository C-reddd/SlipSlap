import React, { Suspense } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-gray-300">
      <div className="min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={<h1>loading</h1>}>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
