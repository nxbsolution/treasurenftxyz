"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CopyToClipboard } from "@/app/(frontend)/_components/CopyToClipboard"
import { Star } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf'];
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const FormSchema = z.object({
    uid: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    depositAddress: z.enum(['TRC-20', 'BEP-20'], {
        required_error: 'Please select a USDT deposit address.',
    }),

    uploadStarCertificate: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (file) =>
                ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
            'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
        ),
    monthlyProgressReport: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (file) =>
                ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
            'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
        ),
    star: z.string().min(1, 'Please select a star.'),
    A: z.string().min(1, 'Please enter a number.'),
    B: z.string().min(1, 'Please enter a number.'),
    C: z.string().min(1, 'Please enter a number.'),
})

export default function Page() {
    const [isSubmiting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            uid: "",
            star: "",
            A: "",
            B: "",
            C: "",
        },
    })
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //     defaultValues: {
    //         uid: ""
    //     },
    // })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
        }, 3000)
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
    }


    return (
        <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[50%]  mx-auto p-2 md:p-4 space-y-6'>
            <h1 className="text-3xl text-center font-semibold grow  py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500 ">
                Apply for Salary
            </h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className='bg-card rounded-lg shadow-md shadow-foreground p-6 space-y-6'>

                        <FormField
                            control={form.control}
                            name="depositAddress" //depositAddress
                            render={({ field }) => (
                                <FormItem className="space-y-6 ">
                                    <FormLabel className="text-lg  font-semibold text-center justify-center mx-auto w-full block">
                                        Your USDT Deposit Address
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

                    <div className='bg-card rounded-lg shadow-md shadow-foreground p-6 space-y-6'>
                        <FormField
                            control={form.control}
                            name="uid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UID</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter UID" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter UID.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Controller
                            control={form.control}
                            name="monthlyProgressReport"
                            render={({ field: { onChange, value, ...field } }) => (
                                <FormItem >
                                    <FormLabel>Upload Monthly progress report</FormLabel>
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
                                    <FormDescription>Upload your star report (image or PDF).</FormDescription>
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


                        <FormField
                            control={form.control}
                            name="star"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Your Star</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
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
                        <div className='space-y-2'>
                            <h3 className='font-semibold'>Add person</h3>
                            <div className='grid grid-cols-3  gap-x-2 gap-y-4'>
                                <FormField
                                    control={form.control}
                                    name="A"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>A</FormLabel>
                                            <FormControl>
                                                <Input type="Number" placeholder="Enter number" {...field} min={0} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}

                                />
                                <FormField
                                    control={form.control}
                                    name="B"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>B</FormLabel>
                                            <FormControl>
                                                <Input type="Number" placeholder="Enter number" {...field} min={0} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="C"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>C</FormLabel>
                                            <FormControl>
                                                <Input type="Number" placeholder="Enter number" {...field} min={0} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex gap-2 col-span-3  '>
                                    <span>Total person added:</span>
                                    <span className='bg-background px-3 h-fit'>233</span>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="flex justify-center">
                        <Button
                            disabled={isSubmiting}
                            type="submit"
                            className={`max-sm:w-full text-background  text-lg rounded-xl  lg:col-span-2 font-bold ${isSubmiting ? 'bg-blue-400' : 'bg-blue-500'}  w-1/2  hover:bg-blue-500   shadow-md shadow-black  hover:shadow-[2px_2px_0px_rgb(255,165,0)] duration-300 `}
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


        </div >
    )
}
