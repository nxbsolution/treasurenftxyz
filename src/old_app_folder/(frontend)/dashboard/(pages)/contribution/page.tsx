import React from 'react'
import ContributionForm from './_components/new-contribution-form'
import LoadingSkeleton from './_components/LoadingSkeleton'
import { getUser } from '@/provider/Auth/payloadFunctions'

async function Page() {

    const { member } = await getUser()

    if (!member) {
        return <LoadingSkeleton />
    }

    return <ContributionForm member={member} />
}

export default Page

