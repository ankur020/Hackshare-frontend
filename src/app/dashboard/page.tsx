"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";

export default function Home() {
  

  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
  }, []);

  return (
    <>
      <DefaultLayout>
        <div></div>
      </DefaultLayout>
    </>
  );
}
