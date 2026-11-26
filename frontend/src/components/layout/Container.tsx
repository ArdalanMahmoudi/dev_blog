import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">{children}</div>;
}

export default Container;
