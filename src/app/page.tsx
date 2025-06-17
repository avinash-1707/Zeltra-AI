import LoginTrigger from "@/components/LoginTrigger";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { loginRequired?: string };
}) {
  const resolvedParams = await searchParams;
  const loginRequired = resolvedParams.loginRequired === "true";
  return (
    <>
      <h1 className="text-7xl flex justify-center items-center h-screen w-screen">
        Hello world
      </h1>
      <LoginTrigger forceOpen={loginRequired} />
    </>
  );
}
