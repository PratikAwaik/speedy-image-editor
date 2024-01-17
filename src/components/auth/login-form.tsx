"use client";

import {FormEvent, useState} from "react";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {Button} from "../ui/button";
import Spinner from "../ui/spinner";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/constants";
import {Info} from "lucide-react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    router.push(routes.EDITOR);
  };

  return (
    <form className="w-full" id="login-form" onSubmit={handleLoginSubmit}>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="password@123"
            type="password"
            autoCorrect="off"
            disabled={isLoading}
            minLength={5}
            required
            onChange={(e) => {
              if (!e.target.validity.valid) return;
            }}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <div className="flex items-center gap-1 text-xs text-slate-200">
            <Info width={16} height={16} />
            Try Tester@123
          </div>
        </div>
        <Button variant="default" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Log In
        </Button>
      </div>
    </form>
  );
}
