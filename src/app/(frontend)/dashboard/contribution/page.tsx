"use client"

import React, { useState, useEffect } from 'react'
import ContributionForm from './_components/new-contribution-form'
import { useAuth } from "@/provider/Auth"
import { Member } from '@/payload-types'
import { getMemberByUserId } from '@/provider/Auth/getMemberByUserId'
import LoadingSkeleton from './_components/LoadingSkeleton'

function Page() {
    const [member, setMember] = useState<Member>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    useEffect(() => {
        const fetchMember = async () => {
            setIsLoading(true)
            try {
                const memberData = await getMemberByUserId(user?.id)
                setMember(memberData)
            } catch (err: any) {
                setError("Failed to fetch member data:" + err?.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMember()
    }, [user])

    if (isLoading || !member) {
        return <LoadingSkeleton />
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-red-500">{error}</h1>
        </div>
    }

    return <ContributionForm member={member} />
}

export default Page

