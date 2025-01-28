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
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

import { sendFormData } from "./actions/sendFomData"

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
    )
    .refine((file) => file.size > 0, 'Star certificate is required'),
  nft_username: z.string().min(2, 'NFT Username must be at least 2 characters.'),
  realName: z.string().min(2, 'Real Name must be at least 2 characters.'),
  uid: z.string().min(2, 'UID must be at least 2 characters.'),
  mobile: z.string().min(10, 'Mobile number is invalid.'),
  cityName: z.string().min(2, 'City name must be at least 2 characters.'),
  uplineName: z.string().min(2, 'Upline name must be at least 2 characters.'),
  star: z.string().min(1, 'Please select a star.'),
  depositAddress: z.enum(['TRC-20', 'BEP-20'], {
    required_error: 'Please select a USDT deposit address.',
  }),
  transactionId: z.string().min(2, 'Transaction ID must be at least 2 characters.'),
  screenShot: z
    .custom<File>((value) => value instanceof File, {
      message: 'Please upload a screenshot.',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})

type FormValues = z.infer<typeof FormSchema>

export default function ContributionForm() {
  const router = useRouter()

  const [selectedStar, setSelectedStar] = useState('0')
  const [isSubmiting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nft_username: '',
      realName: '',
      uid: '',
      mobile: '',
      cityName: '',
      uplineName: '',
      star: '',
      transactionId: '',
    },
  })

  async function onSubmit(values: FormValues) {

    setIsSubmitting(true)

    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    });

    try {
      const result = await sendFormData(formData)

      if (result.success) {
        console.log('Donation submitted successfully:', result.data)
        form.reset()
        console.log(result.data);
        router.push('/success');
      }
      else {
        console.error('Failed to submit contribution:', result.error)
      }

    } catch (error) {
      toast({
        style: {
          backgroundColor: '#fbebec',
          borderRadius: '10px',
          border: '2px solid #f93333',
          opacity: 60,
        },
        description: <div>
          <h1 className='font-bold text-lg'>Failed to submit Contribution</h1>
          <span>{error.message}</span>
        </div>,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const StarAmount = {
    '1star': 25,
    '2star': 60,
    '3star': 90,
    '4star': 180,
    '5star': 380,
    '6star': 580,
  }

  return (
    <div className="bg-gray-50 mb-8">
      <Toaster />
      <div className="mx-auto container max-w-2xl">
        <div className="flex max-sm:flex-col p-4 gap-20 max-sm:gap-4  mx-auto items-center justify-center">
          <div className="relative w-32 max-sm:w-24 bg-red-900 aspect-[489/232] rounded-full overflow-hidden">
            <Image
              src={img1}
              fill
              alt="img"
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 640px) 90px,128px"
            />
          </div>
          <h1 className="text-3xl  font-semibold grow  py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500 ">
            Contribution Form
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="lg:col-span-2 p-6 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <h2 className="font-semibold text-center text-bold text-lg">Star Information</h2>
              <FormField
                control={form.control}
                name="star"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Star</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedStar(StarAmount[value])
                      }}
                      defaultValue={field.value}
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
                            {Array(2)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="3star" className="hover:!bg-blue-100">
                          <div className="flex gap-2">
                            {Array(3)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="4star" className="hover:!bg-blue-100">
                          <div className="flex gap-2 ">
                            {Array(4)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="5star" className="hover:!bg-blue-100">
                          <div className="flex gap-2">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="fill-orange-400 stroke-orange-400"
                                />
                              ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="6star" className="hover:!bg-blue-100">
                          <div className="flex gap-2">
                            {Array(6)
                              .fill(0)
                              .map((_, i) => (
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
              <div className="bg-gray-50 shadow-inner p-4 space-y-2 rounded-xl">
                <h2 className="text-center font-bold text-lg text-blue-900">Star Amount</h2>
                <span className="text-xl font-bold mx-auto block text-center text-blue-400">{`${selectedStar} USDT`}</span>
              </div>

              <Controller
                control={form.control}
                name="uploadStarCertificate"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="relative">
                    <FormLabel>Upload Star Certificate</FormLabel>
                    <Upload className=" absolute top-8 right-4" />
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
                        className="bg-transparent pr-10 text-blue-500"
                      />
                    </FormControl>
                    <FormDescription>Upload your star certificate (image or PDF).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <div className="lg:col-span-2 p-6 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <h2 className="font-semibold text-center text-bold text-lg">User Information</h2>
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
            </div>

            <div className="lg:col-span-2 p-4 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <FormField
                control={form.control}
                name="depositAddress" //depositAddress
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
                            <RadioGroupItem value="TRC-20" />
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
                            <RadioGroupItem value="BEP-20" />
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

            <div className="p-8 bg-white shadow-md shadow-black rounded-3xl space-y-4 ring-primary ">
              <h2 className="font-semibold text-center text-bold text-lg">
                Transection Information
              </h2>
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
            </div>
            <div className="flex justify-center">
              <Button
                disabled={isSubmiting}
                type="submit"
                className={`max-sm:w-full  text-lg rounded-xl  lg:col-span-2 font-bold ${isSubmiting ? 'bg-blue-400' : 'bg-blue-500'}  w-1/2  hover:bg-blue-500   shadow-md shadow-black  hover:shadow-[2px_2px_0px_rgb(255,165,0)] duration-300 `}
              >
                {isSubmiting ? (
                  <div>
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-300 animate-spin dark:text-gray-600 fill-blue-900"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
