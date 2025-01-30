"use server"

import { getPayload } from "payload"
import config from "@/payload.config"

export const getMemberByUserId = async (userId?: number) => {
  try {
    if (!userId) return undefined
    const payload = await getPayload({ config })
    const getMember = payload.find({
      collection: 'members',
      where: {
        user: {
          equals: userId
        }
      }
    })

    return (await getMember).docs[0]
  } catch (error) {
    console.log(error)
  }

}