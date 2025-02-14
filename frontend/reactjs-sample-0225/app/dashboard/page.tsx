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
  
export default function App() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <div className="h-screen">
        <NavBar/>
        <div className="lg:flex">
        <ListBox/>
        <ListBox/>
        <ListBox/>
        </div>
        <Button onPress={onOpen} className="border-2 rounded-full bg-colour3 text-colour1 text-5xl font-bold h-20 w-14">+</Button>
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
  
