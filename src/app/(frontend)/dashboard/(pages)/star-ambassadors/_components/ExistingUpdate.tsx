"use client"
import React, { useState, useCallback } from 'react'

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

import Loader from '@/app/(frontend)/_components/Loader'
import { getEligibility, existingIssueSchema } from './starFromData'
import { updateStarData } from '../_actions/sendStarCertificate'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star } from 'lucide-react'
import Eligibilty from '../../salaries/_components/Eligibilty'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/provider/Auth'

export default function NewIssue() {

  const { member } = useAuth()

  const [isEligible, setIsEligible] = useState<ReturnType<typeof getEligibility>>()

  const router = useRouter()

  const form = useForm<z.infer<typeof existingIssueSchema>>({
    resolver: zodResolver(existingIssueSchema),
    mode: "onSubmit",
    defaultValues: {
      membersA: 0,
      membersBC: 0,
    }
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof existingIssueSchema>) => {
      // try {

      //   const eligibility = getEligibility(data.membersA, data.membersBC)
      //   setIsEligible(eligibility)

      //   if (eligibility.star !== data.starApplyingFor) {
      //     toast({
      //       title: "Your growth rate is not eligible for selected star.",
      //       description: "Please check your eligibility criteria and try again.",
      //       variant: "destructive",
      //     })
      //     return;
      //   }

      //   const formData = new FormData()
      //   Object.entries(data).forEach(([key, value]) => {
      //     if (value instanceof File) {
      //       formData.append(key, value)
      //     } else {
      //       formData.append(key, String(value))
      //     }
      //   });

      //   const result = await updateStarData(formData, member?.id)
      //   if (result.success) {
      //     toast({
      //       title: "Success",
      //       description: "Your application has been submitted successfully.",
      //       variant: "success",
      //     })
      //     router.push("/dashboard")
      //     form.reset()
      //   } else {
      //     toast({
      //       title: "Error uploading data",
      //       description: result.error || "An unknown error occurred",
      //       variant: "destructive",
      //     })
      //   }
      // }
      // catch (error) {
      //   console.error(error)
      //   toast({
      //     title: "Error submitting data",
      //     description: error instanceof Error ? error.message : "An unknown error occurred",
      //     variant: "destructive",
      //   })
      // }
      toast({
        title: "Development in progress",
        description: "This is under development. Please try again later.",
        variant: "warning",
      })
      router.push("/dashboard")
    },
    [member]
  )

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2 flex flex-col">
        <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card m-6'>
          <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Update Star Ambassador Rank</h1>
          <h2 className='font-bold'>Input Your Team:</h2>

          <FormField
            control={form.control}
            name="membersA"
            render={({ field: { value, ...fieldData } }) => (
              <FormItem>
                <FormLabel className="required">Members A</FormLabel>
                <FormControl>
                  <Input {...fieldData} />
                </FormControl>
                <FormDescription>
                  Enter the number of Members in Your Team A
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="membersBC"
            render={({ field: { value, ...fieldData } }) => (
              <FormItem>
                <FormLabel className="required">Members B + C</FormLabel>
                <FormControl>
                  <Input {...fieldData} />
                </FormControl>
                <FormDescription>
                  Enter the number of Members in Your Team B + C
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="starApplyingFor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='required'>Your are applying for star:</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a star" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1star" className="hover:!bg-blue-100">
                      <Star size={14} className="stroke-orange-400 fill-orange-400" />
                    </SelectItem>
                    <SelectItem value="2star" className="hover:!bg-blue-100">
                      <div className="flex gap-2">
                        {Array(2).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                      </div>
                    </SelectItem>
                    <SelectItem value="3star" className="hover:!bg-blue-100">
                      <div className="flex gap-2">
                        {Array(3).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                      </div>
                    </SelectItem>
                    <SelectItem value="4star" className="hover:!bg-blue-100">
                      <div className="flex gap-2 ">
                        {Array(4).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                      </div>
                    </SelectItem>
                    <SelectItem value="5star" className="hover:!bg-blue-100">
                      <div className="flex gap-2">
                        {Array(5).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                      </div>
                    </SelectItem>
                    <SelectItem value="6star" className="hover:!bg-blue-100">
                      <div className="flex gap-2">
                        {Array(6).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select your star level</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="membersScreenshot"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel className="required">Members Screenshot:</FormLabel>
                <FormControl>
                  <Input type="file" {...field} onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)} />
                </FormControl>
                <FormDescription>
                  Upload your valid members screenshot for our verification
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latestStarCertificate"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel className="required">Latest Star Certificate:</FormLabel>
                <FormControl>
                  <Input type="file" {...field} onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)} />
                </FormControl>
                <FormDescription>
                  Upload your latest star ambassador certificate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div >

        {isEligible ? <Eligibilty isEligible={isEligible} /> : <></>}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-1/2 mx-auto max-sm:w-11/12 text-lg rounded-xl text-card bg-blue-500 hover:bg-blue-400">
          {form.formState.isSubmitting ? <Loader /> : 'Apply Now'}
        </Button>

      </form>
    </Form >
  )
}

