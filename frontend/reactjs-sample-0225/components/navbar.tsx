"use client"

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../public/logo.png"
import { useRouter } from 'next/navigation'
import {auth} from "../app/config";
import { onAuthStateChanged } from "firebase/auth";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@heroui/react";

export default function NavBar() {
    let uid = auth.currentUser.uid;
    onAuthStateChanged(auth, (user)=>{
        if(user){
            uid = auth.currentUser.uid; 
        }
        else{
            uid=" ";
        }
    });
    const [loginfo,setLoginfo] = useState(uid ? "Logout" : "Login");
    const [accntNo,setAccountNo] = useState(uid);
    const router = useRouter();
    
    const handleChange = async(e) =>{
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
                <Image
                src = {Logo}
                alt = "Logo"
                width = {50}
                className="border-1 rounded-full border-white hover:cursor-pointer"
                />
            </PopoverTrigger>
            <PopoverContent>
                <button className="bg-colour3 font-semibold text-colour1 p-2 rounded-xl" onClick={handleChange}>
                    {loginfo}
                </button>
            </PopoverContent>
        </Popover>
    </div>
  );
}
