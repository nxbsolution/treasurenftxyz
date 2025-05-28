"use server"

import { getPayload } from "payload"
import config from "@payload-config"

export default async function createQuery({ question, memberId }: { question: string, memberId: number }) {
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'queries',
      data: {
        question,
        member: memberId,
        status: 'open'
      }
    })
    return {
      success: true,
      message: 'Great! Your query has been submitted. Our team will respond shortly.'
    }
  } catch (_) {
    return {
      success: false,
      message: "Ensure you're connected to the internet and try submitting your query again."
    }
  }
}