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
import { getEligibility, existingIssueFields, existingIssueSchema } from './starFromData'
import { updateStarData } from '../_actions/sendStarCertificate'

export default function ExistingIssue() {

  // const [isEligible, setIsEligible] = useState<ReturnType<typeof getEligibility>>()

  const form = useForm<z.infer<typeof existingIssueSchema>>({
    resolver: zodResolver(existingIssueSchema),
    mode: "onChange",
    defaultValues: {
      A: 0,
      BC: 0,
    }
  })

  const onCheck = useCallback(
    (data: z.infer<typeof existingIssueSchema>) => {
      const starLevel = getEligibility(data.A, data.BC)
      // setIsEligible(starLevel)
      if (starLevel) {
        return false
      } else {
        return true
      }
    },
    []
  )

  const onApply = useCallback(
    async (data: z.infer<typeof existingIssueSchema>) => {
      try {
        const validate = onCheck(data)

        if (!validate) {
          toast({
            title: "You are not eligible",
            description: "Please check your eligibility criteria and try again.",
            variant: "destructive",
          })
          return;
        }

        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, String(value))
          }
        });

        const result = await updateStarData(formData)

        if (result.success) {
          toast({
            title: "Success",
            description: "Your application has been submitted successfully.",
            variant: "success",
          })
        } else {
          toast({
            title: "Error uploading data",
            description: result.error || "An unknown error occurred",
            variant: "destructive",
          })
        }
      }
      catch (error) {
        console.error(error)
        toast({
          title: "Error submitting data",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        })
      }
    },
    []
  )

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onCheck)} className="space-y-4 mb-2 flex flex-col">

        {
          existingIssueFields.map((card, index) => {
            return (
              <div key={index} className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card m-6'>
                <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>{card.title}</h1>
                <h2 className='font-bold'>Check Your Status:</h2>
                {card.fields.map((fieldData) => {
                  return (
                    <FormField
                      key={fieldData.name}
                      control={form.control}
                      name={fieldData.name as keyof z.infer<typeof existingIssueSchema>}
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel className={fieldData.required ? "required" : ""}>{fieldData.label}</FormLabel>
                          <FormControl>
                            <Input type={fieldData.type} {...field}
                              onChange={(e) => {
                                if (e.target.files) {
                                  onChange(e.target.files[0])
                                } else {
                                  onChange(e.target.value)
                                }
                              }} />
                          </FormControl>
                          <FormDescription>
                            {fieldData.description}
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

        <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card m-6'>
          <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Eligibilty</h1>
          <p>
            {/* {isEligible === "not eligible" ? "You are not eligible for star certificate" : `You are eligible for ${isEligible} NFT Ambassador`} */}
          </p>
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className={`w-1/2 max-sm:w-11/12 text-lg self-center rounded-xl text-card hover:bg-primary-foreground ${form.formState.isSubmitting ? 'bg-blue-400' : 'bg-blue-500'}`}>
          Check Status
        </Button>
        <Button
          type="button"
          onClick={form.handleSubmit(onApply)}
          // disabled={isEligible === "not eligible"}
          className="w-1/2 mx-auto max-sm:w-11/12 text-lg rounded-xl text-card bg-green-500 hover:bg-green-600">
          {form.formState.isSubmitting ? <Loader /> : 'Apply Now'}
        </Button>

      </form>
    </Form >
  )
}

