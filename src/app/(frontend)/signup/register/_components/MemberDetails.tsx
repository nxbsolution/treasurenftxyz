"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// import { toast } from "@/components/hooks/use-toast"
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
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CopyToClipboard } from '@/app/(frontend)/_components/CopyToClipboard'
import { FieldsDrawer } from 'node_modules/@payloadcms/richtext-lexical/dist/utilities/fieldsDrawer/Drawer'

const FormSchema = z.object({
    country: z.string().min(1, {
        message: "Please select a country.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    uplineUid: z.string().min(2, {
        message: "uli must be at least 2 characters.",
    }),
    uid: z.string().min(2, {
        message: "UID must be at least 2 characters.",
    }),
    uplinename: z.string().min(2, {
        message: "Upline Name must be at least 2 characters.",
    }),
    cityname: z.string().min(2, {
        message: "City Name must be at least 2 characters.",
    }),
    mobilenumber: z.string().min(11, {
        message: "Mobile Number must be at least 11 characters.",
    }),
    depositAddress: z.enum(['TRC-20', 'BEP-20'], {
        required_error: 'Please select a USDT deposit address.',
    }),
})

const MemberDetails = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            country: "",
            name: "",
            uplineUid: "",
            uid: "",
            uplinename: "",
            cityname: "",
            mobilenumber: "",
        },
    })

    const formFields = [
        {
            name: "name",
            label: "Real Name",
            type: "text",
            placeholder: "Demo123",
            description: "Enter your Username."
        },
        {
            name: "uid",
            label: "UID",
            type: "text",
            placeholder: "Demo123",
            description: "Enter your UID."
        },
        {
            name: "uplinename",
            label: "Upline Name",
            type: "text",
            placeholder: "Demo123",
            description: "Enter your Upline Name."
        },
        {
            name: "uplineUid",
            label: "Upline UID",
            type: "text",
            placeholder: "uplineUid",
            description: "Enter your uplineUid."
        },
        {
            name: "cityname",
            label: "City Name",
            type: "text",
            placeholder: "Demo123",
            description: "Enter your City Name."
        },
        {
            name: "mobilenumber",
            label: "Mobile Number",
            type: "number",
            placeholder: "03001234567",
            description: "Enter your Mobile Number."
        },
    ]

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
    }

    return (
        <div className='border shadow-lg p-8 max-sm:p-4 rounded-lg w-1/2 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-10'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Your Country</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue>{field.value || "Select Country"}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                            <SelectItem value="india" >India</SelectItem>
                                            <SelectItem value="pakistan" >Pakistan</SelectItem>
                                            <SelectItem value="uae" >UAE</SelectItem>
                                            <SelectItem value="others" >Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {formFields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name as keyof z.infer<typeof FormSchema>}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            {...formField}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {field.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
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
                                                <RadioGroupItem value="TRC-20" />
                                            </FormControl>
                                            <FormLabel className="font-normal space-y-2">
                                                Tron (TRC20)
                                                <br />
                                                <CopyToClipboard text="TVoq5JD3WqM425UWrFAzXQ3baYBzpnvWpm" />
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="BEP-20" />
                                            </FormControl>
                                            <FormLabel className="font-normal space-y-2">
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
                    <Button type="submit" className='w-1/2 max-md:w-full text-lg self-center rounded-xl text-card hover:bg-primary-foreground'>Submit</Button>
                </form>
            </Form >

        </div>
    )
}

export default MemberDetails
