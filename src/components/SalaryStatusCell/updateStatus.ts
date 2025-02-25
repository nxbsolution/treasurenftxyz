"use server"

import { getPayload } from "payload"
import config from "@payload-config"

import { Salary } from "@/payload-types"

export const updateStatus = async (id: number, status: Salary["status"]) => {

  try {

    const payload = await getPayload({ config })
    await payload.update({
      collection: "salary",
      id,
      data: {
        status
      }
    })

    return {
      success: true,
      error: null,
    }

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Server Error",
    }
  }

}