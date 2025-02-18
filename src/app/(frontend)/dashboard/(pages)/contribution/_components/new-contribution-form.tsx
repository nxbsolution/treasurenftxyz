'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Star, Terminal, Upload } from 'lucide-react'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

import { sendFormData } from '../actions/sendFormData'
import Loader from '@/app/(frontend)/_components/Loader'
import { Member } from '@/payload-types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CopyToClipboard } from '@/app/(frontend)/_components/CopyToClipboard'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf']

const FormSchema = z.object({
  uploadStarCertificate: z
    .custom<File>((value) => value instanceof File, {
      message: 'Please upload a screenshot.',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 2MB. Please compress your image or choose a smaller file.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
    )
    .refine((file) => file.size > 0, 'Star certificate is required'),
  star: z.string().min(1, 'Please select a star.'),
  transactionId: z.string().min(2, 'Transaction ID must be at least 2 characters.'),
  screenShot: z
    .custom<File>((value) => value instanceof File, {
      message: 'Please upload a screenshot.',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 2MB. Please compress your image or choose a smaller file.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})

type FormValues = z.infer<typeof FormSchema>

export default function ContributionForm({ member }: { member: Member }) {


  const [selectedStar, setSelectedStar] = useState<any>(undefined)
  const [isSubmiting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      star: '',
      transactionId: '',
    },
  })

  async function onSubmit(values: FormValues) {

    setIsSubmitting(true)

    const { uploadStarCertificate, screenShot, transactionId, star } = values

    const data = {
      member: member.id,
      realName: member.realName,
      uid: member.uid,
      uploadStarCertificate,
      screenShot,
      transactionId,
      star,
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

        router.push("/dashboard")
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
    '1star': {
      key: string
      label: string
    }
    '2star': {
      key: string
      label: string
    }
    '3star': {
      key: string
      label: string
    }
    '4star': {
      key: string
      label: string
    }
    '5star': {
      key: string
      label: string
    }
    '6star': {
      key: string
      label: string
    }
  }

  const StarAmount: StarAmount = {
    '1star': { key: "1 Star", label: "25" },
    '2star': { key: "2 Star", label: "60" },
    '3star': { key: "3 Star", label: "90" },
    '4star': { key: "4 Star", label: "180" },
    '5star': { key: "5 Star", label: "380" },
    '6star': { key: "6 Star", label: "580" }
  }

  const memberDetails = [
    { label: "UID", value: member.uid },
    // { label: "NFT Username", value: member?.nft_username },
    // { label: "Country", value: member?.country.toUpperCase() },
    // { label: "Level", value: member?.level },
    { label: "Real Name", value: member.realName },
    // { label: "Upline UID", value: member?.uplineUid },
    // { label: "Upline Name", value: member?.uplineName },
    { label: "Mobile Number", value: member.mobile },
    // { label: "City", value: member?.city ?? "".toUpperCase() },
    // { label: "TRC-20 Deposit Address ", value: member?.depositAddress['TRC-20'] },
    // { label: "BEP-20 Deposit Address ", value: member?.depositAddress['BEP-20'] },
    // { label: "Star", value: member?.star || "Not Have a Star Yet" },
  ];

  return (
    <div className="mb-8 pt-4">

      <div className='flex max-xs:flex-col justify-center items-center gap-2'>
        <div className='w-28 aspect-[319/196] relative'>
          <Image
            src='/img1.jpg'
            alt='logo'
            sizes='112px'
            fill
            className='object-contain  rounded-lg' />
        </div>
        <div className='gap-2 text-center font-bold py-2'>
          <h1 className=' text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground'>TEAM OF NINJAS</h1>
          <h1 className=' text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground'>REGISTERATION</h1>
        </div>
      </div>

      <div className="mx-auto container p-4 max-w-2xl space-y-4">

        <div className="lg:col-span-2 p-6 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary animate-pulse ">
          <Alert variant={'destructive'} className='border-2'>
            <Terminal className="h-4 w-4" />
            <AlertTitle className='font-bold'>REMEMBER!</AlertTitle>
            <AlertDescription className='font-semibold'>
              You will not get next month salary if you do not submit your contribution before the 10th of the month.
            </AlertDescription>
          </Alert>
        </div>

        <div className="lg:col-span-2 p-6 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary ">
          <h2 className="font-semibold text-center text-bold text-lg">Your Information</h2>
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
                    <FormLabel className='required'>Select Your Star</FormLabel>
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
                <h2 className="text-center font-bold text-lg text-blue-900">You are {selectedStar?.key || "1 star"} Ambassador </h2>
                <span className="text-xl font-bold mx-auto block text-center text-blue-400">{`Your Contribution is ${selectedStar?.label || "25"} USDT`}</span>
              </div>

              <FormField
                control={form.control}
                name="uploadStarCertificate"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="relative">
                    <FormLabel className='required'>Upload Star Certificate</FormLabel>
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
                USDT Deposit Address
              </h2>

              <div className="bg-gray-50 ">
                <FormLabel className="font-semibold">
                  TRC-20:
                </FormLabel>
                <div className="overflow-auto ">
                  <CopyToClipboard text="TVoq5JD3WqM425UWrFAzXQ3baYBzpnvWpm" />
                </div>
              </div>

              <div className="bg-gray-50">
                <FormLabel className="font-semibold ">
                  BEP-20:
                </FormLabel>
                <div className="overflow-auto ">
                  <CopyToClipboard text="0x9de1fd65e906abaf5661eecfd5be887472a1ded6" />
                </div>
              </div>

            </div>

            <div className="p-8 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary ">
              <h2 className="font-semibold text-center text-bold text-lg">
                Transaction Information
              </h2>

              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='required'>Transaction ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction ID" {...field} />
                    </FormControl>
                    <FormDescription>Enter your transaction ID.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="screenShot"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel className='required'>Screenshot</FormLabel>
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
    </div >
  )
}
