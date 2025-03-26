"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "@/app/lib/firebase/auth"; // Update this path to where your Firebase auth functions are
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { toast } from "@/components/ui/use-toast"; // Assuming you're using shadcn/ui toast

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user, error } = await signIn(email, password);

      if (error) {
        // toast({
        //   title: "Registration failed",
        //   description: error.message,
        //   variant: "destructive",
        // });
        return;
      }

      if (user) {
        // toast({
        //   title: "Account created successfully",
        //   description: "Welcome to our platform!",
        // });
        router.push("/dashboard"); // Redirect to dashboard or wherever you want
      }
    } catch (err) {
      console.error("Registration error:", err);
      // toast({
      //   title: "Something went wrong",
      //   description: "Please try again later",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Signin</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to signin to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            className="bg-white border-gray-400"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <div
              className="ml-auto text-sm underline-offset-4 hover:underline text-white"
            >
              Forgot your password?
            </div>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border-gray-400"
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in to your account...
            </>
          ) : (
            "Sigin"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Dont have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Signup
        </Link>
      </div>
    </form>
  );
}
