import React from "react";
import IPCcode from "@/app/components/IPCcode";
import IPCoffense from "@/app/components/IPCoffense";
const Template = async ({ params }) => {
  const { input: type } = await params 
  console.log(type);

  return (
    <>
      <div className="mt-[8rem] container mx-auto px-4">
        { type=='code' &&  <IPCcode/>}
        { type=='offense' &&  <IPCoffense/>}
      </div>
    </>
  );
};

export default Template;