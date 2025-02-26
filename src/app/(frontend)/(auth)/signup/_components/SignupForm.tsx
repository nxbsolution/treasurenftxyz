"use client"
import React, { useCallback } from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '@/hooks/use-toast'
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/provider/Auth'

import Loader from '@/app/(frontend)/_components/Loader'
import { FormSchema, cardFields } from './formFieldsData'
import { CustomFields, PasswordField, SelectField } from './FormFields'

// const countryPhoneCodes = {
//   india: "+91",
//   pakistan: "+92",
//   bangladesh: "+880",
//   rusia: "+7",
//   italy: "+39",
//   australia: "+61",
//   dubai: "+971", // Part of UAE
//   saudiArabia: "+966",
//   afghanistan: "+93",
//   others: "+" // Default placeholder for other countries
// }

export default function SignupForm() {

  const { create } = useAuth()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      uid: '',
      realName: '',
      mobile: '',
    }
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {

      const refinedData = {
        email: data.email,
        password: data.password,
        uid: data.uid,
        realName: data.realName,
        mobile: data.mobile,
        city: "N/A",
        nft_username: "N/A",
        level: "level1" as const,
        country: "others" as const,
        uplineName: "N/A",
        uplineUid: "N/A",
        "TRC-20": "N/A",
        "BEP-20": "N/A",
      }

      try {
        const { success, message, error } = await create(refinedData)
        if (success) {
          toast({
            title: 'Signup Successful',
            description: message,
            variant: 'success',
          })
          router.push('/dashboard')
        } else {
          toast({
            title: 'Failed to Signup',
            description: error,
            variant: 'destructive',
          })
        }
      } catch (error: any) {
        toast({
          title: 'Signup Failed',
          description: error?.message || 'Check your internet connection and try again.',
          variant: 'destructive',
        })
      }
    },
    [create, router],
  )

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2 flex flex-col">

        {
          cardFields.map((card, index) => {
            return (
              <div key={index} className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card m-6'>
                <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>{card.title}</h1>

                {card.fields.map((field) => {
                  return (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name as keyof z.infer<typeof FormSchema>}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className={field.required ? "required" : ""}>{field.label}</FormLabel>
                          <FormControl>
                            {field.type === "password" ?
                              <PasswordField field={field as CustomFields} formField={formField as any} />
                              : field.type === "select" ? <SelectField field={field as CustomFields} formField={formField as any} />
                                : field.name === "mobile" ? <Input {...formField} placeholder={field.placeholder} /> //onChange={handleMobileChange} value={formField.value || phonePrefix} minLength={phonePrefix.length + 1}
                                  : <Input placeholder={field.placeholder} {...formField} />
                            }
                          </FormControl>
                          <FormDescription>
                            {field.description}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                }
                )}

              </div >
            )
          })
        }

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className={`w-1/2 max-sm:w-11/12 text-lg self-center rounded-xl text-card hover:bg-primary-foreground ${form.formState.isSubmitting ? 'bg-blue-400' : 'bg-blue-500'}`}>
          {form.formState.isSubmitting ? <Loader /> : 'Sign Up'}
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