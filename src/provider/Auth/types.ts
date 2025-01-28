// import type { Permissions } from 'payload/auth'

import type { User, Member } from '../../payload-types'


export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<User>

export type ForgotPassword = (args: { email: string }) => Promise<User>

export type Create = (args: {
  email: string
  username: string
  password: string
}) => Promise<User>

export type Login = (args: { email: string; password: string }) => Promise<User>

export type Logout = () => Promise<void>

export interface AuthContext {
  create: Create
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  permissions?: null | Permissions
  resetPassword: ResetPassword
  // setPermissions: (permissions: null | Permissions) => void
  setUser: (user: null | User) => void
  user?: null | User
  member?: null | Member
  registerMember: Register
}

export type Register = (args: {
  user: number;
  country: 'india' | 'pakistan' | 'uae' | 'bangladesh' | 'others';
  realName?: string | null;
  mobile?: string | null;
  city?: string | null;
  depositAddress: 'TRC-20' | 'BEP-20';
  uid: string;
  uplineName: string;
  uplineUid?: string | null;
}) => Promise<Member | undefined>