"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginModal from "./LoginModal";

export default function LoginTrigger({
  forceOpen = false,
}: {
  forceOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (forceOpen) setOpen(true);

    // Remove `loginRequired` from the URL without reload
    const params = new URLSearchParams(searchParams.toString());
    params.delete("loginRequired");

    const newPath = `${window.location.pathname}?${params.toString()}`;
    router.replace(newPath, { scroll: false });
  }, [forceOpen]);

  return (
    <>
      <button onClick={() => setOpen(true)}>Login</button>
      {open && <LoginModal onClose={() => setOpen(false)} />}
    </>
  );
}
