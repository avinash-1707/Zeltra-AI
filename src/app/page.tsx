import MessageBox from "@/components/MessageBox";
import React from "react";

export default function Home() {
  return (
    <>
      <h1 className="text-7xl flex justify-center items-center h-screen w-screen">
        Hello world
        <MessageBox />
      </h1>
    </>
  );
}
