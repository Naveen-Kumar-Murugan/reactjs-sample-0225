"use client"

import React from "react";
import Image from "next/image";
import Logo from "../public/logo.png"

export default function NavBar() {

  return (
    <div className="w-full h-16 flex justify-between bg-colour3 items-center m-0 px-2">
        <div className="flex items-center justify-between ">
        <Image
            src = {Logo}
            alt = "Logo"
            width = {50}
            className="border-1 rounded-full border-white "
        />
         <p className="text-2xl text-colour1 font-bold px-3">TasksBoard</p>
        </div>
        <Image
            src = {Logo}
            alt = "Logo"
            width = {50}
            className="border-1 rounded-full border-white "
        />
    </div>
  );
}
