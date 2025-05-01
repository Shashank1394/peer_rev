"use client";

import { googleAuthenticate } from "@/actions/google-login";
import { useActionState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthenticate,
    undefined
  );

  return (
    <form className="flex mt-4" action={dispatchGoogle}>
      <Button
        variant={"outline"}
        className="flex flex-row items-center gap-3 w-full"
      >
        <BsGoogle className="w-4 h-4" />
        Google Sign-In
      </Button>
      <p>{errorMsgGoogle}</p>
    </form>
  );
};

export default GoogleLogin;
