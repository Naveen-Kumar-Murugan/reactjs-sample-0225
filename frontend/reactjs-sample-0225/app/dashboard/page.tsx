"use client"

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
  } from "@heroui/react";
import NavBar from "@/components/navbar";
import ListBox from "@/components/Listbox";
import { useState,useEffect } from "react";
import {auth, db} from "../config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
  
export default function App() {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [listName,setListName] = useState("");
    const [tasks,setTasks] = useState({});
    const [listNameArr,setListNameArr] = useState(Object.keys(tasks));
    const user = auth.currentUser? auth.currentUser.uid : ""
    const action = () => {
        setListNameArr(listNameArr => [...listNameArr,listName]);
        setListName("");
        console.log(listNameArr);
        onClose();
    }
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
            },[user]);
    useEffect(() => {
       setListNameArr(Object.keys(tasks));
    }, [tasks]);
    return (
      <div className="h-screen">
        <NavBar />
        <div className="lg:flex">
        <ListBox listNameArr={listNameArr}/>
        </div>
        <Button onPress={onOpen} className="border-2 rounded-full bg-colour3 text-colour1 text-5xl font-bold h-20 w-14">+</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="border-4 bg-colour1 text-colour3">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                    <Input label="Add List" size="md" type="text" onChange={(e) => {setListName(e.target.value)}} />
                </ModalBody>
                <ModalFooter>
                    <Button className="bg-colour4 font-semibold text-colour1" type="submit" onPress={action}>
                        Add
                    </Button>
                    <Button type="reset" className="bg-colour5 font-semibold" variant="flat" onPress={onClose}>
                        Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  
