"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import Link from 'next/link'


const FormSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

const Page = () => {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
    }

    return (
        <div className='border shadow-lg p-10 max-sm:p-4 rounded-lg w-96 max-sm:w-11/12 mx-auto space-y-4 bg-card mt-10'>
            <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Login Here </h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email or Phone" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display email.
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
                                <FormLabel>Password</FormLabel>
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
                                    Password must be at least 8 characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between text-primary'>
                        <Link href={"/forgot-password"}>
                            <Button variant="ghost" size="sm">Forgot Password?</Button>
                        </Link>
                        <Link href={"/signup"}>
                            <Button variant="ghost" size="sm">Sign Up</Button>
                        </Link>
                    </div>
                    <Button type="submit" className='w-full text-card hover:bg-primary-foreground'>Log In</Button>
                </form>
            </Form>
        </div>
    )
}

export default Page




