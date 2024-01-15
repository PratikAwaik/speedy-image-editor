"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import {useState} from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="max-w-[600px]">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Spinner className="mr-2 h-4 w-4" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
