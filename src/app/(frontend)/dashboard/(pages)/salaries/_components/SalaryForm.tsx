"use client"
import React, { useState, useCallback, useEffect } from 'react'

import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '@/hooks/use-toast'
import { z } from "zod"
import { Form } from "@/components/ui/form"

import { Button } from "@/components/ui/button"

import Loader from '@/app/(frontend)/_components/Loader'
import { applySalarySchema } from './salaryFormData'

import MemberDetail from "./MemberDetail"
import GrowthRate from "./GrowthRate"
import Upload from "./Upload"

import { sendSalaryData } from './../_actions/sendSalaryData'

// import { getEligibility } from '../../star-ambassadors/_components/starFromData'
// import Eligibilty from './Eligibilty'
import { Member, Salary, SalaryFormSetting } from '@/payload-types'
import { checkLastContribution, checkSalaryDuplicate } from '@/provider/Auth/payloadFunctions'
import VideoMessage from './VideoMessage'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export type SalaryForm = UseFormReturn<{
  membersA: number;
  membersBC: number;
  "TRC-20": string;
  star: string;
  membersScreenshot: File;
  starCertificate: File;
  uid?: string;
  realName?: string;
}, any, undefined>

export default function SalaryForm({ formSettings, member }: { formSettings: SalaryFormSetting, member: Member }) {

  // const [isEligible, setIsEligible] = useState<ReturnType<typeof getEligibility>>()
  const [isVideoCompleted, setIsVideoCompleted] = useState(!Boolean(formSettings.videoLink))
  const [isContributionPaid, setIsContributionPaid] = useState(true)
  const [duplicateSalary, setIsDuplicate] = useState<Salary>()

  const router = useRouter()

  useEffect(() => {

    form.setValue("TRC-20", member.depositAddress['TRC-20'])
    form.setValue("uid", member.uid)
    form.setValue("realName", member.realName)

    checkSalaryDuplicate(member.id, formSettings.SalaryOpenFor)
      .then((response) => {
        if (response.success) {
          setIsDuplicate(response.result)
        } else {
          toast({
            title: "Error checking salary duplicate",
            description: response.error,
            variant: "destructive",
          })
        }
      }).catch((err) => {
        console.log(err)
        toast({
          title: "Error checking salary duplicate",
          description: err instanceof Error ? err.message : "An unknown error occurred",
          variant: "destructive",
        })
      })

    checkLastContribution(member.id)
      .then((response) => {
        if (response.success) {
          setIsContributionPaid(response.result)
        } else {
          toast({
            title: "Error checking last contribution",
            description: response.error,
            variant: "destructive",
          })
        }
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: "Error checking last contribution",
          description: err instanceof Error ? err.message : "An unknown error occurred",
          variant: "destructive",
        })
      })

  }, [member])


  const form = useForm<z.infer<typeof applySalarySchema>>({
    resolver: zodResolver(applySalarySchema),
    mode: "onSubmit",
    defaultValues: {
      membersA: 0,
      membersBC: 0,
    }
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof applySalarySchema>) => {
      try {

        // const eligibility = getEligibility(data.membersA, data.membersBC)
        // setIsEligible(eligibility)

        // if (eligibility.star !== data.star) {
        //   toast({
        //     title: "Your growth rate is not eligible for selected star.",
        //     description: "Please check your eligibility criteria and try again.",
        //     variant: "destructive",
        //   })
        //   return;
        // }

        const formData = new FormData()
        formData.append("id", String(member.id))
        formData.append("salaryFor", String(formSettings.SalaryOpenFor || Date.now()))
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, String(value))
          }
        });

        if (member.depositAddress['TRC-20'] !== data['TRC-20']) {
          formData.append("depositeAddress", String(data['TRC-20']))
        }

        const result = await sendSalaryData(formData)

        if (result.success) {
          toast({
            title: "Success",
            description: "Your application has been submitted successfully.",
            variant: "success",
          })
          router.push("/dashboard")
          form.reset()
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

  if (duplicateSalary) {
    return (
      <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-5'>
        <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl'>Salary Form</h1>
        <p className='text-center text-red-500'>
          You have already applied for <b>{format(formSettings.SalaryOpenFor || Date.now(), "MMMM yyyy")}</b> salary.
          <br />
          You can apply for salary only once in a month.
        </p>
        <p className='text-center'>
          Your Salary Status is currently <b className='capitalize'>{duplicateSalary.status}</b>.
        </p>
      </div >
    )
  }

  if (!member?.allowSalaryWithoutContribution && !isContributionPaid) {

    return (
      <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-5'>
        <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl'>Salary Form</h1>
        <p className='text-center text-red-500'>
          You are not eligible to apply for salary.<br />
          Pay your contribution first
        </p>
      </div >
    )
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-8 flex flex-col">
        <h1 className=' text-3xl text-center font-bold py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground'>Salary Applying For {format(formSettings.SalaryOpenFor || Date.now(), "MMMM yyyy")}</h1>

        <MemberDetail form={form} member={member} />

        {formSettings.videoLink ?
          <VideoMessage handleVideoComplete={() => setIsVideoCompleted(true)} videoLink={formSettings.videoLink} />
          : null}

        {isVideoCompleted ? (
          <>
            <GrowthRate form={form} teamAPrompt={formSettings.teamAPrompt} teamBCPrompt={formSettings.teamBCPrompt} />

            <Upload form={form} ProgressReportPrompt={formSettings.progressReportPrompt} starPrompt={formSettings.uploadStarPrompt} />

            {/* {isEligible ? <Eligibilty isEligible={isEligible} /> : <></>} */}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-1/2 mx-auto max-sm:w-11/12 text-lg rounded-xl text-card bg-blue-500 hover:bg-blue-400">
              {form.formState.isSubmitting ? <Loader /> : 'Apply Now'}
            </Button>
          </>
        ) : null}

      </form>
    </Form >
  )
}

