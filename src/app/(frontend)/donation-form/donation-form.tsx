'use client'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CopyToClipboard } from './CopyToClipboard'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import img from './img.jpg'
import img1 from './img1.jpg'

import PostForm from './PostForm'

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
import { useToast } from '@/hooks/use-toast'

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
    ).optional(),
  nft_username: z.string().min(2, 'NFT Username must be at least 2 characters.'),
  realName: z.string().min(2, 'Real Name must be at least 2 characters.'),
  uid: z.string().min(2, 'UID must be at least 2 characters.'),
  // mobileNumber: z.string().regex(/^\d{9}$/, 'Mobile number is invalid.'),
  mobile: z.string().min(10, 'Mobile number is invalid.'),
  cityName: z.string().min(2, 'City name must be at least 2 characters.'),
  uplineName: z.string().min(2, 'Upline name must be at least 2 characters.'),
  star: z.string().min(1, 'Please select a star.').optional(),
  depositAddress: z.enum(['Tron (TRC20)', 'BNB Smart Chain (BEP20)'], {
    required_error: 'Please select a USDT deposit address.',
  }).optional(),
  transactionId: z.string().min(2, 'Transaction ID must be at least 2 characters.'),
  screenShot: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ).optional(),
})

export type FormValues = z.infer<typeof FormSchema>

export default function DonationForm() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      realName: '',
      nft_username: '',
      uid: '',
      mobile: '',
      cityName: '',
      uplineName: '',
      star: '',
      transactionId: '',
    },
  })
  const { toast } = useToast()

  async function onSubmit(data: FormValues) {
    try {
      // await PostForm({data})
      // await PostForm()
      // router.push('/success')
    } catch (error) {
      console.error(error)
      // Handle error appropriately
    }
  }

  // function onSubmit(data: FormValues) {

  //   router.push('/success')
  //   console.log(data)
  //   PostForm({data})

  //   // toast({
  //   //   title: 'You submitted the following values:',
  //   //   description: (
  //   //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //   //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //   //     </pre>
  //   //   ),
  //   // })
  // }

  return (
    <>
      <div className="ring-2 ring-black rounded-lg  mx-auto my-2 bg-slate-200">
        <div className="relative w-full mx-auto aspect-[489/232]">
          <Image src={img} fill alt="img" priority className=" object-center" />
        </div>
        <div>
          <h1 className=" text-2xl  text-center py-2">Donation Form </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-2 grid-cols-1 p-4 w-full gap-4 "
          >
            <Controller
              control={form.control}
              name="uploadStarCertificate"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload Star Certificate</FormLabel>
                  <FormControl>
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

            <FormField
              control={form.control}
              name="realName"
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
              name="nft_username"
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
              name="uid"
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
              name="mobile"
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
                      <SelectItem value="1 star: 25 USDT">1 star: 25 USDT</SelectItem>
                      <SelectItem value="2 star: 60 USDT">2 star: 60 USDT</SelectItem>
                      <SelectItem value="3 star: 90 USDT">3 star: 90 USDT</SelectItem>
                      <SelectItem value="4 star: 140 USDT">4 star: 140 USDT</SelectItem>
                      <SelectItem value="5 star: 200 USDT">5 star: 200 USDT</SelectItem>
                      <SelectItem value="6 star: 400 USDT">6 star: 400 USDT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your star level.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depositAddress"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select USDT Deposit Address:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Tron (TRC20)" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Tron (TRC20)
                          <br />
                          <CopyToClipboard text="TVoq5JD3WqM425UWrFAzXQ3baYBzpnvWpm" />
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BNB Smart Chain (BEP20)" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          BNB Smart Chain (BEP20)
                          <br />
                          <CopyToClipboard text="0x9de1fd65e906abaf5661eecfd5be887472a1ded6" />
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
                    <Input placeholder="Transaction ID" {...field} />
                  </FormControl>
                  <FormDescription>Enter your transaction ID.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="screenShot"
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
              className="max-sm:full text-lg  lg:col-span-2 font-bold  mx-auto w-1/2 max-sm:w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="relative w-full mx-auto aspect-[807/686]">
          <Image src={img1} fill alt="img1" priority className=" object-center" />
        </div>
      </div>
    </>
  )
}
