'use client'

// import type { Permissions } from 'payload/auth'

import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'

import type { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

import { createMember, createUser, getUser, payloadForgetPassword, payloadLogin, payloadLogout, payloadResetPassword } from './payloadFunctions'
import { Member, User } from '@/payload-types'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ api?: 'gql' | 'rest'; children: React.ReactNode }> = ({
  api = 'rest',
  children,
}) => {

  const [user, setUser] = useState<null | User>()
  const [member, setMember] = useState<null | Member>()

  useEffect(() => {
    const fetchMe = async () => {
      const { user, member } = await getUser()
      setMember(member)
      setUser(user)
    }
    void fetchMe()
  }, [api])



  const create = useCallback<Create>(
    async (args) => {
      const { password, email, ...rest } = args
      const createdUser = await createUser({ password, email })
      await createMember({ user: Number((await createdUser)?.id) || 0, ...rest })

      return createdUser
    },
    [api],
  )

  const login = useCallback<Login>(
    async (args) => {
      const result = await payloadLogin({ email: args.email, password: args.password })
      setUser(result?.user)
      return {
        success: result.success,
        message: result.message,
      }
    },
    [api],
  )

  const logout = useCallback<Logout>(
    async () => {
      const result = await payloadLogout()
      if (result.success) {
        setUser(null)
      }
      return result
    }, [api])

  const forgotPassword = useCallback<ForgotPassword>(
    async (args) => {
      const token = await payloadForgetPassword(args.email)
      console.log(token)
      return token
    },
    [api],
  )

  const resetPassword = useCallback<ResetPassword>(
    async (args) => {
      const response = await payloadResetPassword(args.password, args.token)
      return response
    },
    [api],
  )

  return (
    <Context.Provider
      value={{
        user,
        member,
        create,
        forgotPassword,
        login,
        logout,
        // permissions,
        // setPermissions,
        resetPassword,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
