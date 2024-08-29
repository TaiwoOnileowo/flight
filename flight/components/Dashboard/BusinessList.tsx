"use client";
import React from "react";
import { businesses } from "@/lib/data";
import tool from "@/assets/icons/tool.svg";
import user from "@/assets/icons/user.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const BusinessList = () => {
  const pathname = usePathname();
  return (
    <>
      {businesses.map((business, index) => (
        <Link
          key={index}
          href={`${pathname}/${business.name}?id=${business.id}`}
        >
          <div className="flex items-center justify-between cursor-pointer bg-white shadow-md p-4 rounded-lg my-3 mb-5">
            <div className="flex items-center">
              <div className="bg-gray-200 w-16 h-16 rounded-md"></div>
              <div className="ml-4">
                <h1 className="font-bold my-1">{business.name}</h1>
                <div className="flex gap-3">
                  <p className="text-sm flex gap-2 items-center">
                    <Image src={user} width={15} height={15} alt="employees" />
                    {business.employeeNo}
                  </p>
                  <p className="text-sm flex gap-2 items-center">
                    <Image src={tool} width={15} height={15} alt="tools" />
                    {business.toolsNo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default BusinessList;