import React,{useState,useEffect} from "react";
import { Button,Input,useDisclosure,Modal,ModalContent,ModalBody,ModalHeader,ModalFooter} from "@heroui/react";
import {auth, db} from "../app/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AddTaskProps {
    tasks: string[];
  }

export default function AddTask({tasks}:AddTaskProps) {
        const {isOpen, onOpen, onOpenChange} = useDisclosure();
        const [completedTasks, setCompletedTasks] = useState<Record<string | number, boolean>>({});
        const user = auth.currentUser?.uid;
        
        useEffect(() => {
               const fetchTasks = async () => {
                 if (user) {
                   const docRef = doc(db, "tasks", user);
                   const docSnap = await getDoc(docRef);
                   if (docSnap.exists()) {
                     setCompletedTasks(docSnap.data().completedTasks);
                   }
                 }
               };
               fetchTasks();
        }, [user]);
        const action = (index: string | number) => {
            if (!user) {
                console.error("User is not authenticated.");
                return; // Prevents execution if user is undefined
              }
            setCompletedTasks((prev) => {
              const updatedCompleted = { ...prev, [index]: !prev[index]}
              setDoc(doc(db, "tasks", user), {completedTasks: updatedCompleted }, { merge: true });
              return updatedCompleted;
              });
              console.log(completedTasks);
          };
return(
        <div>
            <div className="grid mx-2 mb-2"> 
            {tasks.map((taskItem) => (
                <div key={taskItem} className="flex items-center">
                    <input className="my-1 ml-2 w-5 h-5 border-2 border-blue-500 rounded-lg bg-white
    mt-1 checked:bg-blue-800 checked:border-0" 
                    type="checkbox"
                    checked={completedTasks[taskItem] || false}
                    onChange={()=>action(taskItem)}
                    />
                    <button
                    key={taskItem}
                    className="text-xl font-semibold ml-2 bg-white"
                    onClick={onOpen}
                    >
                    {taskItem}
                    </button>
                </div>
            ))}
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="border-4 bg-colour1 text-colour3">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                  <Input label="Add List" size="md" type="text" />
              </ModalBody>
              <ModalFooter>
                  <Button className="bg-colour4 font-semibold text-colour1" type="submit" onPress={onClose}>
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
    )
}