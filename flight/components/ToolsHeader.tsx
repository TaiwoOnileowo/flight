
import { Tool, UserDetails } from "@/types";
import React from "react";
import UserImage from "./UserImage";

const ToolsHeader = ({
  userDetails,

  isPublic,
  isPrivate,
  tools,
}: {
  userDetails: UserDetails | null;

  isPublic?: boolean;
  isPrivate?: boolean;
  tools: Tool[];
}) => {
  const publicTools = tools?.filter((tool) => tool.public);
  const privateTools = tools?.filter((tool) => !tool.public);
  let activeTools = tools;
  let toolText = "My Tools";
  if (isPublic) {
    activeTools = publicTools;
    toolText = "Public Tools";
  } else if (isPrivate) {
    activeTools = privateTools;
    toolText = "Private Tools";
  }

  return (
    <div className="w-full flex justify-between items-center p-6">
      <h1 className="text-2xl font-bold">
        {toolText} {activeTools && `(${activeTools.length})`}
      </h1>
      <UserImage userDetails={userDetails} />
    </div>
  );
};

export default ToolsHeader;
