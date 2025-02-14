"use client"

import React, { useState, useEffect } from 'react'
import ContributionForm from './_components/new-contribution-form'
import { useAuth } from "@/provider/Auth"
import { Member } from '@/payload-types'
import LoadingSkeleton from './_components/LoadingSkeleton'
import { PaginatedDocs } from 'payload'
import { Button } from '@/components/ui/button'
import { deleteUser } from '@/provider/Auth/payloadFunctions'
import Loader from '../../../_components/Loader'
import { useRouter } from 'next/navigation'
import { getMemberByUserId } from './actions/getMemberByUserId'

function Page() {
    const [member, setMember] = useState<PaginatedDocs<Member> | undefined>()
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const router = useRouter()

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

    const handleClick = async () => {
        setIsDeleting(true)
        if (!user?.id) {
            router.push("/login")
            return
        }

        try {
            const response = await deleteUser(user.id)
            if (response) {
                router.push("/signup")
            } else {
                setError("Account deletion unsuccessful. Please Try Again.")
            }
        } catch (error: any) {
            setError(`Unable to process your request: ${error?.message || 'Please try again later'}`)
        } finally {
            setIsDeleting(false)
        }
    }

    if (isLoading || !member) {
        return <LoadingSkeleton />
    }

    if (!member.totalDocs) {
        return <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
            <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Member Account Not Found</h1>
            <p className="text-gray-600 text-center mb-4">We couldn&#39;t locate your member account in our system.</p>
            {isDeleting ? <Loader /> : <Button className="hover:underline text-white" onClick={handleClick}>Try Recreating your account</Button>}
        </div>
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-red-500">{error}</h1>
        </div>
    }

    return <ContributionForm member={member.docs[0]} />
}

export default Page

