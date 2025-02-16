"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import {Button} from "@heroui/react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  const action1 = () => {
    router.push('/signup')
  }
  const action2 = () => {
    router.push('/login')
  }
  return (
    <div>
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        Start Managing your tasks and stay in schedule using 
        {" "}
        <Highlight className="text-black dark:text-white">
          TasksBoard.
        </Highlight>
        <div className="mt-4">
        <Button className="bg-colour4 font-semibold text-colour1 mx-5" type="submit" onPress={action1}>
          Sign Up
        </Button>
        <Button type="reset" className="bg-colour5 font-semibold" variant="flat" onPress={action2}>
          Login
        </Button>
        </div>
      </motion.h1>
    </HeroHighlight>
    <div>
      
      {/* <Button>Sign Up</Button> */}
    </div>
    </div>
  );
}
