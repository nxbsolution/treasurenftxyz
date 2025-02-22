"use server"

import { getPayload } from "payload"
import config from "@payload-config"

export const getDuplicateContribution = async (memberId: number, contributionFor: string) => {

  try {
    const payload = await getPayload({ config })
    const contribution = await payload.find({
      collection: 'contributions',
      where: {
        member: {
          equals: memberId
        },
        contributionFor: {
          equals: contributionFor
        }
      },
      pagination: false,
      sort: "-createdAt",
      limit: 1,
    })

    console.log(contribution)
    return {
      success: true,
      result: contribution.docs[0],
      error: ""
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      result: null,
      error: error instanceof Error ? error.message : "Something went wrong"
    }
  }


}