"use server"
import { getPayload } from "payload"
import config from "@/payload.config"


export async function getSalaryFormSettings() {

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: "salary-form-settings"
    })

    return {
      data: settings,
      error: null
    }

  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}