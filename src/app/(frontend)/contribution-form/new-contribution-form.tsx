'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CopyToClipboard } from './CopyToClipboard'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import img1 from './img1.jpg'
import { Star, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf']

const FormSchema = z.object({
  uploadStarCertificate: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
    ),
  NFTUsername: z.string().min(2, 'NFT Username must be at least 2 characters.'),
  RealName: z.string().min(2, 'Real Name must be at least 2 characters.'),
  UID: z.string().min(2, 'UID must be at least 2 characters.'),
  // mobileNumber: z.string().regex(/^\d{9}$/, 'Mobile number is invalid.'),
  mobileNumber: z.string().min(10, 'Mobile number is invalid.'),
  cityName: z.string().min(2, 'City name must be at least 2 characters.'),
  uplineName: z.string().min(2, 'Upline name must be at least 2 characters.'),
  selectedStar: z.string().min(1, 'Please select a star.'),
  usdtDepositAddress: z.enum(['Tron (TRC20)', 'BNB Smart Chain (BEP20)'], {
    required_error: 'Please select a USDT deposit address.',
  }),
  transactionId: z.string().min(2, 'Transaction ID must be at least 2 characters.'),
  screenshot: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  amount: z.string().min(1, 'Please select a star.'),
})

type FormValues = z.infer<typeof FormSchema>

export default function DonationForm() {
  const [selectedStar, setSelectedStar] = useState('')
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      NFTUsername: '',
      RealName: '',
      UID: '',
      mobileNumber: '',
      cityName: '',
      uplineName: '',
      selectedStar: '',
      transactionId: '',
      amount: '',
    },
  })

  function onSubmit(data: FormValues) {
    router.push('/success')
  }

  const StarAmount={
    1:25,
    2:60,
    3:90,
    4:140,
    5:200,
    6:400,
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto container max-w-2xl">
        <div className="flex max-sm:flex-col p-4 gap-20 max-sm:gap-4  mx-auto items-center justify-center">
          <div className="relative w-32 max-sm:w-24 bg-red-900 aspect-[489/232] rounded-full overflow-hidden">
            <Image src={img1} fill alt="img" priority className="object-cover" />
          </div>
          <h1 className=" text-3xl  font-semibold grow  py-2">Contribution Form </h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-2 grid-cols-1 p-4 w-full gap-4 "
          >
            <div className="lg:col-span-2 p-4 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <FormField
                control={form.control}
                name="selectedStar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Star</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>

                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a star"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">
                          <Star size={14} className="stroke-orange-400 fill-orange-400" />
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex gap-2">
                            {Array(2)
                              .fill(0)
                              .map((star, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}{' '}
                          </div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex gap-2">
                            {Array(3)
                              .fill(0)
                              .map((star, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}{' '}
                          </div>
                        </SelectItem>
                        <SelectItem value="4">
                          <div className="flex gap-2">
                            {Array(4)
                              .fill(0)
                              .map((star, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="5">
                          <div className="flex gap-2">
                            {Array(5)
                              .fill(0)
                              .map((star, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="6">
                          <div className="flex gap-2">
                            {Array(6)
                              .fill(0)
                              .map((star, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your star level.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="uploadStarCertificate"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="relative">
                    <FormLabel>Amount</FormLabel>
                    <FormControl className="relative">
                      <Input type="text" placeholder="star"  value={selectedStar}/>
                    </FormControl>
                    <FormDescription>User Selected amount.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="uploadStarCertificate"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="relative">
                    <FormLabel>Upload Star Certificate</FormLabel>
                    <Upload className=" absolute z-10 top-8 right-4" />
                    <FormControl className="relative">
                      <Input
                        type="file"
                        placeholder="Upload star"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Upload your star certificate (image or PDF).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-2 p-4 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <FormField
                control={form.control}
                name="RealName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Real Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Real Name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your real name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="NFTUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NFT Username</FormLabel>
                    <FormControl>
                      <Input placeholder="NFT username" {...field} />
                    </FormControl>
                    <FormDescription>Enter your NFT username.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="UID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UID</FormLabel>
                    <FormControl>
                      <Input placeholder="UID" {...field} />
                    </FormControl>
                    <FormDescription>Enter your UID.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile Number" {...field} />
                    </FormControl>
                    <FormDescription>Enter your correct mobile number.</FormDescription>
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
                      <Input placeholder="City Name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your correct city name.</FormDescription>
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
                      <Input placeholder="Upline Name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your upline name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-2 p-4 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <FormField
                control={form.control}
                name="usdtDepositAddress"
                render={({ field }) => (
                  <FormItem className="space-y-6 ">
                    <FormLabel className="text-lg  font-semibold text-center justify-center mx-auto w-full block">
                      Select USDT Deposit Address
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-4"
                      >
                        <FormItem className="flex items-center justify-center space-x-3 space-y-0 p-0">
                          <FormControl>
                            <RadioGroupItem value="Tron (TRC20)" />
                          </FormControl>
                          <div className="bg-gray-50   flex flex-col text-center p-4 space-y-2 rounded-xl ring-1 ring-orange-400">
                            <FormLabel className="text-[20px] max-sm:text-[16px] font-semibold">
                              Tron (TRC20)
                            </FormLabel>
                            <div className=" overflow-auto sm:min-w-[380px] max-sm:max-w-[310px]  max-xs:max-w-[210px] max-xxs:max-w-[170px]">
                              <CopyToClipboard text="TVoq5JD3WqM425UWrFAzXQ3baYBzpnvWpm" />
                            </div>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center justify-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="BNB Smart Chain (BEP20)" />
                          </FormControl>
                          <div className="bg-gray-50  flex flex-col text-center p-4 space-y-2 rounded-xl ring-1 ring-orange-400">
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
            </div>

            <div className="lg:col-span-2 p-8 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction ID" {...field} />
                    </FormControl>
                    <FormDescription>Enter your transaction ID.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="screenshot"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Screenshot</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Upload screenshot"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Upload a screenshot of your transaction.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="max-sm:full text-lg rounded-xl  lg:col-span-2 font-bold   mx-auto  w-1/2 max-sm:w-full hover:shadow-[2px_2px_0px_rgb(255,165,0)] duration-300  "
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      
      </div>
    </div>
  )
}
