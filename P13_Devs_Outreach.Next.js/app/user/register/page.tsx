"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Upload } from "lucide-react"

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

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers & _ allowed"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.any().optional(),
})

type RegisterFormValues = z.infer<typeof registerSchema>

/* ---------------- Component ---------------- */

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [preview, setPreview] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })


  const { registerApi } = React.useContext(Context) as {
    registerApi: (formData: {}) => void
  }

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data)

    const formData = new FormData()


    formData.append("username", data.username)

    formData.append("email", data.email)

    formData.append("password", data.password)

    formData.append("profilepic", data.avatar)


    registerApi(formData)

  }




  const handleAvatarChange = (file?: File) => {
    if (!file) return
    setValue("avatar", file)
    setPreview(URL.createObjectURL(file))
  }

  return (

    <>
    {/* //   <ThemeToggle/> */}

    <Header heading="devs_outreach" punchline="Register With Us" link="Login" href="/user/login"/>
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Join us by filling the details below
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-24 w-24 overflow-hidden rounded-full border bg-muted">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Upload />
                  </div>
                )}
              </div>

              <Label
                htmlFor="avatar"
                className="cursor-pointer text-sm text-primary underline"
              >
                Upload profile picture
              </Label>

              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleAvatarChange(e.target.files?.[0])
                }
              />
            </div>



            {/* Username */}
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="irfan_dev"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
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
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
            </div>

            {/* Submit */}
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>

            <Separator />

            {/* OAuth */}
            <Button variant="outline" className="w-full" type="button">
              Sign up with Google
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Already have an account?
          <a href="/user/login" className="ml-1 underline hover:text-primary">
            Sign in
          </a>
        </CardFooter>
      </Card>
    </div>

    </>
  )
}
