import React from "react";
import { InputForm } from "./components/inputForm";
import { PenLineIcon } from "lucide-react";
// import { Toaster } from "@/components/ui/toaster";
// import Navbar from "./(front)/_components/nav";

const Page = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      {/* <Navbar /> */}
      
      <h1 className="text-7xl ">Create </h1>
      
    
      <div className="w-1/2 ">
        <InputForm />
      </div>

    </div>
  );
};

export default Page;
