"use client"

import React from 'react'
import ContributionForm from './_components/new-contribution-form'
import { redirect } from "next/navigation"
import { useAuth } from "@/provider/Auth"

function Page() {

    const { user } = useAuth()
    if (!user) {
        redirect("/login")
    }


    return <ContributionForm />
}

export default Page
