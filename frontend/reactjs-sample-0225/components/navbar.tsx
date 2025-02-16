"use client"

import React, { useState,useEffect } from "react";
import Image from "next/image";
import Logo from "../public/logo.png"
import { useRouter } from 'next/navigation'
import {auth, db} from "../app/config";
import { onAuthStateChanged } from "firebase/auth";
import {Popover, PopoverTrigger, PopoverContent, Button, user} from "@heroui/react";
import { doc, getDoc } from "firebase/firestore";

export default function NavBar({profilePic}) {
    let uid = auth.currentUser.uid;
    onAuthStateChanged(auth, (user)=>{
        if(user){
            uid = auth.currentUser.uid; 
        }
        else{
            uid=" ";
        }
    });
    // useEffect(() => {
    //     const fetchTasks = async () => {
    //       if (user) {
    //         const docRef = doc(db, "tasks", user);
    //         const docSnap = await getDoc(docRef);
    //         const response = await fetch(`https://picsum.photos/id/${docSnap.data().index}/info`);
    //         const data = await response.json();
    //         console.log("data",data)
    //         setProfilePic(data.download_url);
    //       }
    //     };
    //     fetchTasks();
    //   },[]);
    // useEffect(() => {
    //     const fetchProfilePic = async () => {
    //       try {
            
    //       } catch (error) {
    //         console.error("Error fetching profile picture:", error);
    //       }
    //     };
    //     fetchProfilePic();
    //   }, [user]);
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
                <div>
                <Image
                src = {profilePic}
                alt = "Logo"
                width = {50}
                height={50}
                className="border-1 rounded-full border-white hover:cursor-pointer"
                />
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
