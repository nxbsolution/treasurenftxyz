'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
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
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

import { useAuth } from '@/provider/Auth'

import { sendFormData } from '../actions/sendFormData'
import Loader from '@/app/(frontend)/_components/Loader'

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
  star: z.string().min(1, 'Please select a star.'),
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

  const { member } = useAuth()

  const [selectedStar, setSelectedStar] = useState("0")
  const [isSubmiting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nft_username: '',
      star: '',
      transactionId: '',
    },
  })

  async function onSubmit(values: FormValues) {

    setIsSubmitting(true)

    const { uploadStarCertificate, screenShot, transactionId, star, nft_username } = values

    const data = {
      member: member?.id,
      uploadStarCertificate,
      screenShot,
      transactionId,
      star,
      nft_username
    }

    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    });

    try {
      const result = await sendFormData(formData)
      if (result.success) {
        form.reset()
        toast({
          variant: 'success',
          title: 'Contribution submitted successfully',
          description: "Thank you for your contribution!",
        })
      }
      else {
        console.log('Failed to submit contribution:', result.error)
      }

    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: <div>
          <h1 className='font-bold text-lg'>Failed to submit Contribution</h1>
          <span>{error?.message}</span>
        </div>,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  interface StarAmount {
    '1star': string
    '2star': string
    '3star': string
    '4star': string
    '5star': string
    '6star': string
  }

  const StarAmount: StarAmount = {
    '1star': "25",
    '2star': "60",
    '3star': "90",
    '4star': "180",
    '5star': "380",
    '6star': "580",
  }

  const memberDetails = [
    { label: "Name", value: member?.realName },
    { label: "Country", value: member?.country },
    { label: "City", value: member?.city },
    { label: "Mobile", value: member?.mobile },
    { label: "UID", value: member?.uid },
    { label: "Deposit Address", value: member?.depositAddress },
    { label: "Upline Name", value: member?.uplineName },
    { label: "Upline UID", value: member?.uplineUid }
  ];
  console.log(member)

  return (
    <div className="mb-8 pt-4">
      <div className="mx-auto container max-w-2xl space-y-4">

        <h1 className="text-3xl text-center font-semibold py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground ">
          Contribution Form
        </h1>

        <div className="lg:col-span-2 p-6 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary ">
          <h2 className="font-semibold text-center text-bold text-lg">User Information</h2>
          {memberDetails.map((item, index) => (
            <div key={index} className="space-y-4">
              <p className="flex justify-between bg-muted">
                <strong>{item.label}: </strong>{item.value}
              </p>
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="lg:col-span-2 p-6 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary ">
              <h2 className="font-semibold text-center text-bold text-lg">Star Information</h2>
              <FormField
                control={form.control}
                name="star"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Star</FormLabel>
                    <Select
                      onValueChange={(value: keyof StarAmount) => {
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
                        <SelectItem value="1star" className="hover:!bg-card">
                          <Star size={14} className="stroke-orange-400 fill-orange-400" />
                        </SelectItem>
                        <SelectItem value="2star" className="hover:!bg-card">
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
              <div className="bg-card shadow-inner p-4 space-y-2 rounded-xl">
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


            <div className="p-8 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary ">
              <h2 className="font-semibold text-center text-bold text-lg">
                Transection Information
              </h2>
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
                className={`max-sm:w-full text-background  text-lg rounded-xl  lg:col-span-2 font-bold ${isSubmiting ? 'bg-blue-400' : 'bg-blue-500'}  w-1/2  hover:bg-blue-500   shadow-md shadow-foreground  hover:shadow-[2px_2px_0px_rgb(255,165,0)] duration-300 `}
              >
                {isSubmiting ? (
                  <Loader />
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
