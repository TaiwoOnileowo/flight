import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex p-6 gap-6 h-screen overflow-hidden">
      <Sidebar />
      <div className="w-[80%]">{children}</div>
    </div>
  );
};

export default layout;
