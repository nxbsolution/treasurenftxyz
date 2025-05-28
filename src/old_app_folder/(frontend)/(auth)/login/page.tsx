"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useCallback } from 'react'
import { useAuth } from '@/provider/Auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import Loader from '../../_components/Loader'
import Link from 'next/link'


const FormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

const Page = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        const { success, message, user } = await login(data)
        if (success) {
          toast({
            title: 'Login Successful',
            description: 'User is successfully logged in',
            variant: 'success',
          })
          if (user?.roles?.some(role => ["superadmin", "admin", "manager"].includes(role))) {
            router.push('/admin')
          } else {
            router.push('/dashboard')
          }
        } else {
          toast({
            title: 'Login Failed',
            description: message || 'Incorrect email or password. Try again. If the issue persists, check your internet.',
            variant: 'destructive',
          })
        }
      } catch (error: any) {
        toast({
          title: 'Login Failed',
          description: error?.message || 'Incorrect email or password. Try again. If the issue persists, check your internet.',
          variant: 'destructive',
        })
      }
    },
    [login, router],
  )

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='border shadow-lg p-10 max-sm:p-4 rounded-lg w-96 max-sm:w-11/12 mx-auto space-y-4 bg-card'>
        <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Login Here </h1>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='required'>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g. name@example.com" required {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your account email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='required'>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Password must be at least 6 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={"/forgot-password"} className='text-primary text-sm font-semibold underline'>
              Forgot Password?
            </Link>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className={`w-full text-card hover:bg-primary-foreground ${form.formState.isSubmitting ? 'bg-blue-400' : 'bg-blue-500'} `}>
              {form.formState.isSubmitting ? <Loader /> : 'Log In'}
            </Button>
          </form>
        </Form>
        <Button
          disabled={form.formState.isSubmitting}
          variant={"outline"}
          onClick={() => router.push("/signup")}
          className={`w-full border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white`}>
          Sign Up
        </Button>
      </div>
    </div>
  )
}

export default Page




