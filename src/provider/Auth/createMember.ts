"use server"

import { getPayload } from "payload"
import config from "@/payload.config"
import { captureRejectionSymbol } from "events";

interface Data {
  user: number;
  mobile: string | null;
  city: string | null | undefined;
  uid: string;
  nft_username: string;
  level: "level1" | "level2" | "level3" | "level4" | "level5" | "level6";
  star?: "star1" | "star2" | "star3" | "star4" | "star5" | "star6";
  country: "india" | "pakistan" | "bangladesh" | "rusia" | "italy" | "australia" | "dubai" | "saudiArabia" | "afghanistan" | "others";
  realName: string;
  uplineName: string;
  uplineUid: string;
  "TRC-20": string;
  "BEP-20": string;
}

export const createMember = async (args: Data) => {
  try {
    const payload = await getPayload({ config })
    const getMember = payload.create({
      collection: 'members',
      data: {
        user: args.user,
        mobile: args.mobile,
        city: args.city,
        uid: args.uid,
        nft_username: args.nft_username,
        level: args.level,
        star: args.star,
        country: args.country,
        realName: args.realName,
        uplineName: args.uplineName,
        uplineUid: args.uplineUid,
        depositAddress: {
          "TRC-20": args["TRC-20"],
          "BEP-20": args["BEP-20"],
        }
      }
    })

    return await getMember
  } catch (error) {
    console.log(error)
  }

}

interface UserData {
  email: string;
  password: string;
}



export const createUser = async (args: UserData) => {
  try {
    const payload = await getPayload({ config })
    const getUser = payload.create({
      collection: 'users',
      data: {
        username: args.email,
        email: args.email,
        password: args.password
      }
    })

    return await getUser
  } catch (error: any) {
    throw new Error(error)
  }

}

export const deleteUser = async (id: number) => {
  try {
    const payload = await getPayload({ config })
    const deleteUser = payload.delete({
      collection: 'users',
      id
    })
    return await deleteUser
  } catch (error) {
    console.log(error)
  }
}