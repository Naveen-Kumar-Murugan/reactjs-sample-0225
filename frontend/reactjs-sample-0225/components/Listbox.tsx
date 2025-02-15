"use client"

import React,{useState,useEffect} from "react";
import { Button,Input,Checkbox,useDisclosure,Modal,ModalContent,ModalBody,ModalHeader,ModalFooter} from "@heroui/react";
import AddTask from "./AddTask";
import {auth, db} from "../app/config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export default function ListBox({listNameArr}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [taskName, setTaskName] = useState("");
    const [tasks,setTasks] = useState({});

    const user = auth.currentUser? auth.currentUser.uid : "";
    console.log(tasks);
      useEffect(() => {
        const fetchTasks = async () => {
          if (user) {
            const docRef = doc(db, "tasks", user);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setTasks(docSnap.data().tasks);
            }
          }
        };
        fetchTasks();
      }, [user]);
      useEffect(() => {
        if (user && Object.keys(tasks).length > 0) {
          setDoc(doc(db, "tasks", user), { tasks },{ merge: true });
        }
      }, [tasks]);
    
    
    const addTask = (item) => {
          setTasks((prev) => ({
            ...prev,
            [item]: [...(prev[item] || []), taskName],
          }));
          console.log(tasks);
          setTaskName((prev) => ({...prev,[item]:""}));
      };

  return (
    <>
    {listNameArr.map((item) => (
    <div key={item} className="lg:w-1/4 max-w-screen-md h-fit flex justify-between bg-white border-4 border-colour3 rounded-2xl shadow-2xl lg:m-3 m-4 px-2 flex-col">
        <div  className="flex justify-between items-center">
        <p className="text-2xl font-bold mt-3 mx-2 text-colour4">{item}</p>
        <button onClick={onOpen}>
            <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M12 6h.01M12 12h.01M12 18h.01"/>
            </svg>
        </button>
        </div>
        <div className="flex my-3 mx-2 items-center">
            <Button  className="border-2 rounded-full bg-colour4 text-colour1 text-3xl min-w-4 px-3 h-fit font-bold" onPress={()=>addTask(item)}>+</Button>
            <Input label="Add Task" size="sm" type="text" className="ml-2" value={taskName[item]} onChange={(e)=>setTaskName(e.target.value)}/>
        </div>
        {/* <AddTask tasks={tasks[item]}/> */}
    </div>
    ))}
    </>
  );
}
