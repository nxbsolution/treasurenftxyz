"use client"
import React, { useState } from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import SignupForm from "./_components/SignupForm"
import NotAllowed from "./_components/NotAllowed"

const Page = () => {

    const [selectedTeam, setSelectedTeam] = useState('')

    return (
        <div className="mx-auto container p-4 max-w-2xl space-y-4">
            <div className='gap-2 text-center font-bold py-2'>
                <h1 className=' text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground'>TEAM OF NINJAS</h1>
                <h1 className=' text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground'>REGISTERATION</h1>
            </div>
            <div className='border shadow-lg p-8 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
                <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Select Your Team</h1>
                <RadioGroup defaultValue="" onValueChange={(value) => setSelectedTeam(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ninja" id="r1" />
                        <Label htmlFor="r1">Team of Ninjas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="r2" />
                        <Label htmlFor="r2">Other</Label>
                    </div>
                </RadioGroup>
            </div>
            <div>
                {
                    selectedTeam && (selectedTeam === 'ninja' ? <SignupForm /> : <NotAllowed />)
                }
            </div>

        </div>
    )
}

export default Page
