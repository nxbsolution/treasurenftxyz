"use client"
import React from 'react'
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
import { toast } from '@/hooks/use-toast'
import Loader from '../../_components/Loader'
import { useAuth } from '@/provider/Auth'

export default function Page() {

    const { forgotPassword } = useAuth()

    const FormSchema = z.object({
        email: z.string().email().min(2, {
            message: "email must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await forgotPassword(data)
            toast({
                title: 'Success',
                variant: 'success',
                description: 'Reset password link sent to your email',
            })
        } catch (error) {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error instanceof Error ? error.message : 'Something went wrong',
            })
        }
    }

    return (
        <div className='flex items-center justify-center my-40'>
            <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
                <h1 className="font-bold text-lg text-center ">Forget Password?</h1>
                <p>You can reset your password here.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email address" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your account email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader /> : "Reset"}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}