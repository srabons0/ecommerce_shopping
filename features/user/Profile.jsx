"use client";
import { useSession } from "next-auth/react";
import React from "react";

function Profile() {
  const { data: session } = useSession();
  // console.log(session);
  return <div>

  </div>;
}

export default Profile;
