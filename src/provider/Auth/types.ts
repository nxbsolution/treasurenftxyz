// import type { Permissions } from 'payload/auth'

import type { User, Member } from '../../payload-types'


export type ResetPassword = (args: {
  password: string
  token: string
}) => Promise<Message>

export type ForgotPassword = (args: { email: string }) => Promise<string>

export type Create = (args: {
  email: string
  password: string
  mobile: string;
  city: string;
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
}) => Promise<User>

export type Message = {
  success: boolean;
  message?: string;
}

export type Login = (args: { email: string; password: string }) => Promise<Message>

export type Logout = () => Promise<Message>

export interface AuthContext {
  user: null | undefined | User
  member: null | undefined | Member
  create: Create
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  permissions?: null | Permissions
  resetPassword: ResetPassword
  // setPermissions: (permissions: null | Permissions) => void
}