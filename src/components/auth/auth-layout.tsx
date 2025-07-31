"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

function AuthLayout() {
  const [activeTabs, setActiveTabs] = useState("login");

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-5 border rounded-lg bg-card shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Welcome!</h1>
        <Tabs
          value={activeTabs}
          onValueChange={setActiveTabs}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSuccess={() => setActiveTabs("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthLayout;
