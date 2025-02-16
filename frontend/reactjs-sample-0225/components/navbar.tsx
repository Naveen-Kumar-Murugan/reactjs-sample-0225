"use client"

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../public/logo.png"
import { useRouter } from 'next/navigation'
import {auth} from "../app/config";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/react";

export default function NavBar({}) {
    const [profilePic, ] = useState(localStorage.getItem("profilePic"));
    console.log("profile pic :",profilePic);
    // let uid = auth.currentUser.uid;
    // onAuthStateChanged(auth, (user)=>{
    //     if(user){
    //         uid = auth.currentUser.uid; 
    //     }
    //     else{
    //         uid=" ";
    //     }
    // });
    const router = useRouter();

    const handleChange = async() =>{
        await auth.signOut();
        router.push('/login')
    }

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
        <Popover placement="bottom">
            <PopoverTrigger>
                <div>
                    {profilePic &&
                <Image
                src = {profilePic}
                alt = "Logo"
                width = {50}
                height={50}
                className="border-1 rounded-full border-white hover:cursor-pointer"
                />
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <button className="bg-colour3 font-semibold text-colour1 p-2 rounded-xl" onClick={handleChange}>
                    Logout
                </button>
            </PopoverContent>
        </Popover>
    </div>
  );
}
