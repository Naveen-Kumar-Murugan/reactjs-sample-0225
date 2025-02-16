"use client"

import React , {useState,useEffect} from "react"
import {Form, Input, Button} from "@heroui/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import {auth,db} from "../config";
import { createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { collection, getDocs,getDoc,setDoc,doc } from "firebase/firestore";


export default function Page() {
    // const [action, setAction] = React.useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [user,setUser] = useState();
    const router = useRouter()

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
            ...prevState,
            [name]: value,
            }));
            console.log(formData);
        };
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
            });
            return () => unsubscribe();
        }, []);

  return (
    <div className="flex-col flex justify-center bg-colour1 h-screen items-center">
        <p className="text-2xl mb-2 font-bold text-colour3">Sign Up</p>
        <Form
        className="w-full h-96 max-w-xs flex flex-col gap-4 border-4 rounded-3xl p-5 bg-colour5 shadow-2xl border-colour3"
        onSubmit={ async (e) => {
            e.preventDefault();
            try{
                const user = await createUserWithEmailAndPassword(auth,formData.email,formData.password);
                const usersRef = collection(db, "tasks");
                const snapshot = await getDocs(usersRef);
                const usersCount = snapshot.docs.length;
                console.log("count ",usersCount);
            
                const userRef = doc(db, "tasks", auth.currentUser?.uid);
                const userSnap = await getDoc(userRef);
            
                if (!userSnap.exists()) {
                  await setDoc(userRef, { index: usersCount + 1, tasks: {} });
                }
                router.push('/dashboard')
            }
            catch(error){
                alert(error);
            }
        }}
        >
        <div className="w-full">
            <label className="text-colour3 font-semibold ">Username</label>
            <Input
                isRequired
                errorMessage="Please enter a valid username"
                name="name"
                placeholder="Enter your username"
                type="text"
                value={formData.name}
                onChange={handleChange}
            />
        </div>
        <div className="w-full">
            <label className="text-colour3 font-semibold ">Email</label>
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            className="my-2 "
        />
        </div>
        <div className="flex gap-2">
            <Button className="bg-colour4 font-semibold text-colour1" type="submit">
            Sign Up
            </Button>
            <Button type="reset" className="bg-colour1 font-semibold" variant="flat">
            Reset
            </Button>
        </div>
        </Form>
        <div className="flex mt-3 justify-evenly">
            <p className="text-sm pr-2 text-colour2 font-semibold">Already have an account? </p>
            <Link href={'/login'}><p className="text-sm text-blue-800 underline"> Login</p></Link>
        </div>
    </div>
  );
}
