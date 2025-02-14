"use client"

import React from "react";
import { Button,Input,Checkbox,useDisclosure,Modal,ModalContent,ModalBody,ModalHeader,ModalFooter} from "@heroui/react";
export default function ListBox() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="lg:w-1/4 max-w-screen-md h-fit flex justify-between bg-white border-4 border-colour3 rounded-2xl shadow-2xl lg:m-3 m-4 px-2 flex-col">
        <p className="text-2xl font-bold mt-3 mx-2 text-colour4">List Name</p>
        <div className="flex my-3 mx-2 items-center">
            <Button className="border-2 rounded-full bg-colour4 text-colour1 text-3xl min-w-4 px-3 h-fit font-bold">+</Button>
            <Input label="Add Task" size="sm" type="text" className="ml-2"/>
        </div>
        <div className="grid mx-2 mb-2">
            <div className="flex items-center ">
            <Checkbox className="my-1 ml-0.5" size="lg"/>
                <button className="text-xl font-semibold ml-0.5 bg-white" onClick={onOpen}>Option</button>
            </div>
            <div className="flex items-center ">
            <Checkbox className="my-1 ml-0.5" size="lg"/>
                <button className="text-xl font-semibold ml-0.5 bg-white" onClick={onOpen}>Option</button>
            </div>
            <div className="flex items-center ">
            <Checkbox className="my-1 ml-0.5" size="lg"/>
                <button className="text-xl font-semibold ml-0.5 bg-white" onClick={onOpen}>Option</button>
            </div>
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
  );
}
