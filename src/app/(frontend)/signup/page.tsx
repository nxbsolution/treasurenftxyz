"use client"
import React, { useState, useCallback } from 'react'
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
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

import { useAuth } from '@/provider/Auth'


const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});

const Page = () => {

    const { create } = useAuth()

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    })


    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = useCallback(
        async (data: z.infer<typeof FormSchema>) => {

            const userData = {
                email: data.email,
                username: data.name,
                password: data.password,
            }

            try {
                const createdUser = await create(userData)
                console.log(createdUser)
                toast({
                    title: 'Success',
                    description: 'Successfully created user',
                    variant: 'success',
                })
                router.push('/signup/register')
            } catch (error: any) {
                toast({
                    title: 'Error',
                    description: error?.message || 'An error occurred',
                    variant: 'destructive',
                })
            }
        },
        [create, router],
    )

    const formFields = [
        {
            name: "name",
            label: "User Name",
            type: "text",
            placeholder: "Demo123",
            description: "Enter your Username."
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "abc123@gmail.com",
            description: "Enter your email."
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
            description: "Password must be at least 8 characters",
            isPassword: true
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm Password",
            description: "Password must be at least 8 characters",
            isPassword: true
        }
    ]


    return (
        <div className='border shadow-lg p-8 max-sm:p-4 rounded-lg w-1/2 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-10'>
            <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Create a new account</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
                    {formFields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name as keyof z.infer<typeof FormSchema>}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        {field.isPassword ? (
                                            <div className='relative'>
                                                <Input
                                                    type={showPassword[field.name as keyof typeof showPassword] ? "text" : "password"}
                                                    placeholder={field.placeholder}
                                                    {...formField}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full"
                                                    onClick={() => setShowPassword(prev => ({
                                                        ...prev,
                                                        [field.name]: !prev[field.name as keyof typeof showPassword]
                                                    }))}
                                                >
                                                    {showPassword[field.name as keyof typeof showPassword] ?
                                                        <Eye size={16} /> :
                                                        <EyeOff size={16} />
                                                    }
                                                </Button>
                                            </div>
                                        ) : (
                                            <Input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                {...formField}
                                            />
                                        )}
                                    </FormControl>
                                    <FormDescription>
                                        {field.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button type="submit" className='w-1/2 max-md:w-full text-lg self-center rounded-xl text-card hover:bg-primary-foreground'>Sign Up</Button>
                    <div className='flex justify-center text-primary'>
                        <Link href={"/login"}>
                            <span className='text-foreground'>Already have Account?</span>
                            <Button variant="ghost" size="sm" className='text-lg hover:underline hover:bg-inherit'>Log In</Button>
                        </Link>
                    </div>
                </form>
            </Form >
        </div >
    )
}

export default Page
