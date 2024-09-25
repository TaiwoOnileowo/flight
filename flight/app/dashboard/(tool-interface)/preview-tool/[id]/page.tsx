"use client";
import { useAppContext } from "@/context";
import { useGetToolByIdQuery } from "@/hooks/reactQueryHooks";
import CreateToolHeader from "@/components/CreateTool/CTHeader";
import CTInterface from "@/components/CreateTool/CTInterface";
import CreateToolSidebar from "@/components/CreateTool/CTSidebar";

import React from "react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { setTool, tool } = useAppContext();
  const { data } = useGetToolByIdQuery(id);
  if (!data) return null;
  if (tool.name === "") {
    setTool(data);
  }

  return (
    <div className="h-screen overflow-hidden grid grid-rows-12">
      <CreateToolHeader />
      <div className="grid grid-cols-12 overflow-hidden  h-screen row-span-11">
        <CreateToolSidebar />
        <CTInterface />
      </div>
    </div>
  );
};

export default Page;