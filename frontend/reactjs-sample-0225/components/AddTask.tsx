import React,{useState} from "react";
import { Button,Input,Checkbox,useDisclosure,Modal,ModalContent,ModalBody,ModalHeader,ModalFooter} from "@heroui/react";


export default function AddTask({tasks}) {
        const {isOpen, onOpen, onOpenChange} = useDisclosure();
return(
        <div>
            <div className="grid mx-2 mb-2"> 
            {tasks.map((taskItem) => (
                <div key={taskItem} className="flex items-center">
                    <Checkbox className="my-1 ml-0.5" size="lg" />
                    <button
                    key={taskItem}
                    className="text-xl font-semibold ml-0.5 bg-white"
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