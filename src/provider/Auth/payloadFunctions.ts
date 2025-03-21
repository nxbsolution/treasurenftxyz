"use server"

import { getPayload } from "payload"
import config from "@/payload.config"
import { cookies, headers } from "next/headers";
import { Member } from "@/payload-types";

interface CreateAccount {
  email: string;
  password: string;
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

interface Login {
  email: string;
  password: string;
}

export const createAccount = async (args: CreateAccount) => {
  try {
    const payload = await getPayload({ config })
    const existingUser = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: args.email
        }
      },
      pagination: false,
      depth: 0,
      select: {
        email: true,
      }
    })
    if (existingUser.docs.length) {
      return {
        success: false,
        message: "",
        error: "Duplicate email Error. User with this email already exist. Please sign in or use a different email.",
        user: null,
        member: null
      }
    }

    const existingMember = await payload.find({
      collection: "members",
      where: {
        uid: {
          equals: args.uid
        }
      },
      pagination: false,
      depth: 0,
      select: {
        uid: true,
      }
    })
    if (existingMember.docs.length) {
      return {
        success: false,
        message: "",
        error: "Duplicate UID Error. User with this UID already exist. Please sign in or use a different UID.",
        user: null,
        member: null
      }
    }

    const createdUser = await payload.create({
      collection: 'users',
      data: {
        username: args.email,
        email: args.email,
        password: args.password
      }
    })

    const createMember = await payload.create({
      collection: 'members',
      data: {
        user: createdUser.id,
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

    return {
      success: true,
      message: "Account created successfully",
      error: "",
      user: createdUser,
      member: createMember
    }

  } catch (error) {
    return {
      success: false,
      message: "",
      error: error instanceof Error ? error.message : "Failed to create account. Check your internet connection and try again.",
      user: null,
      member: null
    }
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

      return { success: true, message: "Successfully logged in", user: result.user }
    } else {
      return { success: false, message: "Login Failed! Please Try Again.", user: null }
    }

  }
  catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Login Failed! Try Again.", user: null }
  }
}

export const payloadLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("payload-token"); // Deletes the HTTP-only cookie

    return { success: true }; // Indicate success
  } catch (error) {
    return { success: false, message: "An error occurred during logout" };
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
    const token = await payload.forgotPassword({
      collection: 'users',
      data: {
        email
      }
    })
    return {
      success: true,
      message: "Password reset link has been sent to your email",
      error: ""
    }
  } catch (error) {
    return {
      success: false,
      message: "",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }
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
        depth: 0,
        select: {
          contributions: false
        },
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
    return { user: null, member: null }
  }
}

type StarRating = "1star" | "2star" | "3star" | "4star" | "5star" | "6star";
type MemberStar = "star1" | "star2" | "star3" | "star4" | "star5" | "star6";

export const getMemberNotifications = async ({ id, limit = 10, page = 1, star }: { id: number | undefined, limit?: number, page?: number, star?: Member["star"] }) => {

  if (!id) {
    return {
      notifications: [],
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
      error: "Member ID not found"
    }
  }

  const convertStarFormat = (star: MemberStar | null | undefined): StarRating | undefined => {
    if (star) {
      const number = star.charAt(4);
      return `${number}star` as StarRating;
    }
  };


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
                  equals: convertStarFormat(star)
                }
              },
              {
                assignToUid: {
                  equals: id
                }
              }
            ]
          }
        ]
      }
    })

    return {
      notifications: notifications.docs,
      totalPages: notifications.totalPages,
      currentPage: notifications.page,
      hasNextPage: notifications.hasNextPage,
      hasPrevPage: notifications.hasPrevPage,
      error: null
    }
  } catch (error) {
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
    return { success: false, result: false, error: error instanceof Error ? error.message : "An unknown error occurred", }
  }
}

export const checkSalaryDuplicate = async (memberId: number, salaryFor: string | undefined | null) => {
  try {
    const payload = await getPayload({ config })
    const salaryDuplicate = await payload.find({
      collection: 'salary',
      limit: 1,
      pagination: false,
      sort: '-createdAt',
      where: {
        member: {
          equals: memberId
        },
        salaryFor: {
          equals: salaryFor
        }
      }
    })
    return { success: true, result: salaryDuplicate.docs[0], error: "" }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred", }
  }
}