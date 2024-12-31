"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { sendFormData } from "../actions/sendFomData"


const formSchema = z.object({
  uploadStarCertificate: z.instanceof(File, { message: "Star certificate is required" }),
  realName: z.string().min(2, { message: "Real name must be at least 2 characters." }),
  nft_username: z.string().min(2, { message: "NFT Username must be at least 2 characters." }),
  uid: z.string().min(1, { message: "UID is required." }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 characters." }),
  cityName: z.string().min(2, { message: "City name must be at least 2 characters." }),
  uplineName: z.string().min(2, { message: "Upline name must be at least 2 characters." }),
  star: z.enum(["1star", "2star", "3star", "4star", "5star", "6star"]),
  depositAddress: z.enum(["TRC-20", "BEP-20"]),
  transactionId: z.string().min(1, { message: "Transaction ID is required." }),
  screenShot: z.instanceof(File, { message: "Screenshot is required" }),
})

export function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      realName: "",
      nft_username: "",
      uid: "",
      mobile: "",
      cityName: "",
      uplineName: "",
      star: "1star",
      depositAddress: "TRC-20",
      transactionId: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const formData = new FormData()
    
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    })

    try {
      const result = await sendFormData(formData)
      if (result.success) {
        console.log('Donation submitted successfully:', result.data)
        form.reset()
        console.log()
      } else {
        console.error('Failed to submit donation:', result.error)
        console.log()
      }
    } catch (error) {
      console.error('Error submitting donation:', error)
      console.log ()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="uploadStarCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Star Certificate</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="realName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Real Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nft_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NFT Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe_nft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UID</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City Name</FormLabel>
              <FormControl>
                <Input placeholder="New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uplineName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upline Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="star"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Your Star</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a star" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["1star", "2star", "3star", "4star", "5star", "6star"].map((star) => (
                    <SelectItem key={star} value={star}>
                      {star}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depositAddress"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select USDT Deposit Address</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="TRC-20" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      TRC-20
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BEP-20" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      BEP-20
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input placeholder="0x1234..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="screenShot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Screenshot</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}

