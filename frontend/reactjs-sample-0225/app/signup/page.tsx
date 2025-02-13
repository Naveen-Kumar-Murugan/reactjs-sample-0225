"use client"

import React from "react";
import {Form, Input, Button} from "@heroui/react";
import Link from "next/link";

export default function Page() {
  const [action, setAction] = React.useState(null);

  return (
    <div className="flex-col flex justify-center bg-colour1 h-screen items-center">
        <p className="text-2xl mb-2 font-bold text-colour3">Sign Up</p>
        <Form
        className="w-full h-96 max-w-xs flex flex-col gap-4 border-4 rounded-3xl p-5 bg-colour5 shadow-2xl border-colour3"
        // validationBehavior="aria"
        //onReset={() => setAction("reset")}
        onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            //setAction(`submit ${JSON.stringify(data)}`);
        }}
        >
        <div className="w-full">
            <label className="text-colour3 font-semibold ">Username</label>
            <Input
                isRequired
                errorMessage="Please enter a valid username"
                name="username"
                placeholder="Enter your username"
                type="text"
            />
        </div>
        <div className="w-full">
            <label className="text-colour3 font-semibold ">Email</label>
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                name="username"
                placeholder="Enter your email"
                type="text"
            />
        </div>

        <div className="w-full">
            <label className="text-colour3 font-semibold">Password</label>
        <Input
            isRequired
            errorMessage="Please enter a valid password"
            name="email"
            placeholder="Enter your password"
            type="email"
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
        {action && (
            <div className="text-small text-default-500">
            Action: <code>{action}</code>
            </div>
        )}
        </Form>
        <div className="flex mt-3 justify-evenly">
            <p className="text-sm pr-2 text-colour2 font-semibold">Already have an account? </p>
            <Link href={'/login'}><p className="text-sm text-blue-800 underline"> Login</p></Link>
        </div>
    </div>
  );
}
