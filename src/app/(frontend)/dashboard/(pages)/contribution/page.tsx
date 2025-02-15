"use client"
import React from 'react'
import ContributionForm from './_components/new-contribution-form'
import { useAuth } from "@/provider/Auth"
import LoadingSkeleton from './_components/LoadingSkeleton'

function Page() {
    const { member } = useAuth()

    if (!member) {
        return <LoadingSkeleton />
    }

    return <ContributionForm member={member} />
}

export default Page

