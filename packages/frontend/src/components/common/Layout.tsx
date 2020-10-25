import React, { Suspense } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

function RoutePlaceholder() {
  return <div>DAFDASFDAFADSFSADSFSAFDFSDFDSFASDFD</div>;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="bg-gray-300">
      <div className="min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={<RoutePlaceholder />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
