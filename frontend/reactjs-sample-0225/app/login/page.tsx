"use client"

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import {Form, Input, Button} from "@heroui/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { auth,db } from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


export default function Page() {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState("");
    const router = useRouter();

  return (
    <div className="flex-col flex justify-center bg-colour1 h-screen items-center">
        <p className="text-2xl mb-2 font-bold text-colour3">Login</p>
        <Form
        className="w-full h-72 max-w-xs flex flex-col gap-4 border-4 rounded-3xl p-5 bg-colour5 shadow-2xl border-colour3"
        // validationBehavior="aria"
        //onReset={() => setAction("reset")}
        onSubmit={async (e) => {
            e.preventDefault();
            try{
                await signInWithEmailAndPassword(auth,email,password);
                console.log("User Logged In Succesfully");
                localStorage.setItem("user", auth.currentUser.uid);
                const docRef = doc(db, "tasks",auth.currentUser?.uid);
                const docSnap = await getDoc(docRef);
                const response = await fetch(`https://picsum.photos/id/${docSnap.data().index}/info`);
                const data = await response.json();
                localStorage.setItem("profilePic",data.download_url);
                router.push("/dashboard");
            }
            catch(error){
                alert(error);
            }
        }}
        >
        <div className="w-full">
            <label className="text-colour3 font-semibold ">Email</label>
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
        </div>

        <div className="w-full">
            <label className="text-colour3 font-semibold">Password</label>
        <Input
            isRequired
            errorMessage="Please enter a valid password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="my-2 "
        />
        </div>
        <div className="flex gap-2">
            <Button className="bg-colour4 font-semibold text-colour1" type="submit">
            Login  
            </Button>
            <Button type="reset" className="bg-colour1 font-semibold" variant="flat">
            Reset
            </Button>
        </div>
        </Form>
        <div className="flex mt-3 justify-evenly">
            <p className="text-sm pr-2 text-colour2 font-semibold">Don't have an account? </p>
            <Link href={'/signup'}><p className="text-sm text-blue-800 underline"> Sign Up</p></Link>
        </div>
    </div>
  );
}

