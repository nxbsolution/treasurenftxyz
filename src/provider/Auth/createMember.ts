"use server"

import { getPayload } from "payload"
import config from "@/payload.config"

interface Data {
  user: number;
  country: 'india' | 'pakistan' | 'uae' | 'bangladesh' | 'others';
  realName?: string | null;
  mobile?: string | null;
  city?: string | null;
  depositAddress: 'TRC-20' | 'BEP-20';
  uid: string;
  uplineName: string;
  uplineUid?: string | null;
}

export const createMember = async (args: Data) => {
  try {
    const payload = await getPayload({ config })
    const getMember = payload.create({
      collection: 'members',
      data: {
        ...args
      }
    })

    return await getMember
  } catch (error) {
    console.log(error)
  }

}