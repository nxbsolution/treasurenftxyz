"use client"

import React from 'react'
import ContributionForm from './_components/new-contribution-form'
import { useAuth } from "@/provider/Auth"
import Link from 'next/link'

function Page() {

    const { user } = useAuth()
    if (!user) return (
        <div className='flex items-center justify-center my-40'>
            <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
                <h1 className="font-bold text-lg text-center ">Not Authorized</h1>
                <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg">Login First</Link>
            </div>
        </div>
    )


    return <ContributionForm />
}

export default Page
