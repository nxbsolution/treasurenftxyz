"use client"
import React, { useState, useCallback } from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '@/hooks/use-toast'
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useAuth } from '@/provider/Auth'


import Loader from '@/app/(frontend)/_components/Loader'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CopyToClipboard } from '@/app/(frontend)/_components/CopyToClipboard'

const FormSchema = z.object({
  username: z.string().min(6, {
    message: "Name must be at least 6 characters.",
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
  country: z.enum(["india", "pakistan", "uae", "bangladesh", "others"], {
    required_error: "Please select a country.",
  }),
  realName: z.string().min(6, {
    message: "Name must be at least 6 characters.",
  }),
  uplineUid: z.string().min(6, {
    message: "uli must be at least 6 characters.",
  }),
  uid: z.string().min(6, {
    message: "UID must be at least 6 characters.",
  }),
  uplineName: z.string().min(6, {
    message: "Upline Name must be at least 6 characters.",
  }),
  city: z.string().min(6, {
    message: "City Name must be at least 6 characters.",
  }),
  mobile: z.string().min(11, {
    message: "Mobile Number must be at least 11 characters.",
  }),
  depositAddress: z.enum(['TRC-20', 'BEP-20'], {
    required_error: 'Please select a USDT deposit address.',
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"], // path of error
})

export default function SignupForm() {

  const { create } = useAuth()
  const [isSubmiting, setIsSubmitting] = useState(false)

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })


  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "india",
      realName: "",
      uplineUid: "",
      uid: "",
      uplineName: "",
      city: "",
      mobile: "",
    },
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      setIsSubmitting(true)
      const { confirmPassword, ...rest } = data

      try {
        await create(rest)
        router.push('/dashboard')
        toast({
          title: 'Success',
          description: 'Successfully created user',
          variant: 'success',
        })
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error?.message || 'An error occurred',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [create, router],
  )

  const formFields = [
    {
      name: "username",
      label: "User Name",
      type: "text",
      placeholder: "Demo123",
      description: "Create your unique username, must contain 6 characters."
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
    },
    {
      name: "realName",
      label: "Real Name",
      type: "text",
      placeholder: "Demo123",
      description: "Enter your Username."
    },
    {
      name: "uid",
      label: "UID",
      type: "text",
      placeholder: "Demo123",
      description: "Enter your UID."
    },
    {
      name: "uplineName",
      label: "Upline Name",
      type: "text",
      placeholder: "Demo123",
      description: "Enter your Upline Name."
    },
    {
      name: "uplineUid",
      label: "Upline UID",
      type: "text",
      placeholder: "uplineUid",
      description: "Enter your uplineUid."
    },
    {
      name: "city",
      label: "City Name",
      type: "text",
      placeholder: "Demo123",
      description: "Enter your City Name."
    },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "number",
      placeholder: "03001234567",
      description: "Enter your Mobile Number."
    },
  ]

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2 flex flex-col">
        <div className='border shadow-lg p-8 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card m-6'>
          <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Create a new account</h1>
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

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Your Country</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue>{field.value || "Select Country"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="india" >India</SelectItem>
                      <SelectItem value="pakistan" >Pakistan</SelectItem>
                      <SelectItem value="uae" >UAE</SelectItem>
                      <SelectItem value="others" >Others</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depositAddress" //depositAddress
            render={({ field }) => (
              <FormItem className="space-y-6 ">
                <FormLabel>
                  Your USDT Deposit Address
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex max-xl:flex-col justify-between space-y-4"
                  >
                    <FormItem className="flex items-center justify-start space-x-3">
                      <FormControl>
                        <RadioGroupItem value="TRC-20" />
                      </FormControl>
                      <div className="bg-gray-50   flex flex-col text-center p-4 space-y-2 rounded-xl ring-1 ring-primary">
                        <FormLabel className="text-[20px] max-sm:text-[16px] font-semibold">
                          Tron (TRC20)
                        </FormLabel>
                        <div className=" overflow-auto sm:min-w-[380px] max-sm:max-w-[310px]  max-xs:max-w-[210px] max-xxs:max-w-[170px]">
                          <CopyToClipboard text="TVoq5JD3WqM425UWrFAzXQ3baYBzpnvWpm" />
                        </div>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-center justify-start space-x-3">
                      <FormControl>
                        <RadioGroupItem value="BEP-20" />
                      </FormControl>
                      <div className="bg-gray-50  flex flex-col text-center p-4 space-y-2 rounded-xl ring-1 ring-primary">
                        <FormLabel className="text-[20px] max-sm:text-[16px] font-semibold ">
                          BNB Smart Chain (BEP20)
                        </FormLabel>
                        <div className=" overflow-auto sm:min-w-[380px] max-sm:max-w-[310px]  max-xs:max-w-[210px] max-xxs:max-w-[170px]">
                          <CopyToClipboard text="0x9de1fd65e906abaf5661eecfd5be887472a1ded6" />
                        </div>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div >

        <Button
          disabled={isSubmiting}
          type="submit"
          className={`w-1/2 max-sm:w-11/12 text-lg self-center rounded-xl text-card hover:bg-primary-foreground ${isSubmiting ? 'bg-blue-400' : 'bg-blue-500'}`}>
          {isSubmiting ? (
            <Loader />
          ) : (
            'Sign Up'
          )}
        </Button>
        <div className='flex justify-center text-primary'>
          <Link href={"/login"}>
            <span className='text-foreground'>Already have Account?</span>
            <Button variant="ghost" size="sm" className='text-lg hover:underline hover:bg-inherit'>Log In</Button>
          </Link>
        </div>
      </form>
    </Form >
  )
}
