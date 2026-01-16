"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Context } from "@/app/Store"
import ThemeToggle from "@/components/theme/ThemeToggle"
import Header from "@/components/layout/Header"


/* ---------------- Schema ---------------- */

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

/* ---------------- Component ---------------- */

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })


  const {loginApi} = React.useContext(Context) 


  const onSubmit = async (data: LoginFormValues) => {
        console.log("Login Data:", data)
        loginApi(data)
    
  }

  return (


    <>

    {/* <ThemeToggle/>  */}


    <Header heading="devs_outreach" punchline="Login to your account" link="SignUp" href="/user/register"/>

   
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">

   
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="irfan@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <Separator />

            {/* OAuth */}
            <Button variant="outline" className="w-full" type="button">
              Continue with Google
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Don’t have an account?
          <a href="/user/register" className="ml-1 underline hover:text-primary">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>

     </>
  )
}
