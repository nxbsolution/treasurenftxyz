"use server"

import { getPayload } from "payload"
import config from "@/payload.config"
import { cookies, headers } from "next/headers";

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

interface UserData {
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
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

export const payloadLogin = async (args: Login) => {
  try {
    const payload = await getPayload({ config })
    const result = await payload.login({
      collection: 'users',
      data: {
        email: args.email,
        password: args.password
      }
    })

    if (result.token) {
      const storeCookie = await cookies();
      storeCookie.set("payload-token", result.token, {
        httpOnly: true,
        path: "/",
        secure: true,
      })

      return { success: true, message: "Login Successfully", user: result.user }
    } else {
      return { success: false, message: "Login Failed", user: null }
    }

  }
  catch (error) {
    console.error("Login Error", error);
    throw new Error("Incorrect Password or Email");
  }
}

export const payloadLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("payload-token"); // Deletes the HTTP-only cookie

    return { success: true }; // Indicate success
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "An error occurred during logout" };
  }
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
    throw new Error("Email already exists")
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

export const payloadForgetPassword = async (email: string) => {
  try {
    const payload = await getPayload({ config })
    const forgetPassword = await payload.forgotPassword({
      collection: 'users',
      data: {
        email
      }
    })
    return forgetPassword
  } catch (error) {
    console.log(error)
    return "something went wrong"
  }
}

export const payloadResetPassword = async (password: string, token: string) => {
  try {
    const payload = await getPayload({ config })
    const result = await payload.resetPassword({
      collection: 'users',
      data: {
        password,
        token
      },
      overrideAccess: true
    })

    if (result.token) {
      const storeCookie = await cookies();
      storeCookie.set("payload-token", result.token, {
        httpOnly: true,
        path: "/",
        secure: true,
      })

      return { success: true, message: "Your password has been successfully updated. You can now log in with your new password." }
    } else {
      return { success: false, message: "Unable to update password. Please try again or contact support." }
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Your password reset link has expired or is invalid. Please request a new reset link.",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }

}

export const getUser = async () => {
  try {
    const getHeaders = await headers()
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: getHeaders })

    if (user) {
      const member = await payload.find({
        collection: 'members',
        where: {
          user: {
            equals: user.id
          }
        }
      })
      return { user, member: member.docs[0] || null }
    }

    return { user: null, member: null }
  } catch (error) {
    console.log(error)
    return { user: null, member: null }
  }
}

export const getMemberNotifications = async (id: number | undefined, page: number = 1, limit: number = 10) => {
  try {
    const payload = await getPayload({ config })
    const notifications = await payload.find({
      collection: 'notifications',
      sort: '-createdAt',
      limit,
      page,
      where: {
        and: [
          {
            display: {
              equals: true
            }
          },
          {
            or: [
              {
                assignToStars: {
                  equals: '1star'
                }
              },
              {
                assignToMembers: {
                  equals: id
                }
              }
            ]
          }
        ]
      }
    })

    console.log(notifications)

    return {
      notifications: notifications.docs,
      totalPages: notifications.totalPages,
      currentPage: notifications.page,
      hasNextPage: notifications.hasNextPage,
      hasPrevPage: notifications.hasPrevPage,
      error: null
    }
  } catch (error) {
    console.log(error)
    return {
      notifications: [],
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
      error: error instanceof Error ? error.message : "Something went wrong"
    }
  }
}

export const checkLastContribution = async (id: number) => {
  try {

    const payload = await getPayload({ config })
    const lastContribution = await payload.find({
      collection: 'contributions',
      where: {
        member: {
          equals: id,
        },
        verify: {
          not_equals: "REJECTED"
        },
        and: [
          {
            createdAt: {
              greater_than: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)  //last 30 days
            }
          }
        ]
      },
      sort: '-createdAt',
      limit: 1
    })

    return { success: true, result: Boolean(lastContribution.totalDocs), error: "" }

  } catch (error) {
    console.log(error)
    return { success: false, result: false, error: error instanceof Error ? error.message : "An unknown error occurred", }
  }
}