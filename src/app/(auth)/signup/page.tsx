"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signupMutation = api.auth.signup.useMutation({
    onSuccess: () => {
      toast.success("Account created! You can now sign in with your new account.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "An unknown error occurred.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate({ matricNumber, password });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="matricNumber">Matriculation Number</Label>
            <Input
              id="matricNumber"
              type="text"
              placeholder="e.g., U18/EE/001"
              required
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}