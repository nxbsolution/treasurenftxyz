'use client'

import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'

import type { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

import { createAccount, getUser, payloadForgetPassword, payloadLogin, payloadLogout, payloadResetPassword } from './payloadFunctions'
import { Member, User } from '@/payload-types'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
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
  }, [])

  const create = useCallback<Create>(
    async (args) => {
      const response = await createAccount(args)
      if (response.success) {
        await payloadLogin({ email: args.email, password: args.password })
        setUser(response.user)
        setMember(response.member)
      }
      return response
    },
    [],
  )

  const login = useCallback<Login>(
    async (args) => {
      const result = await payloadLogin({ email: args.email, password: args.password })
      setUser(result?.user)
      return {
        success: result.success,
        message: result.message,
        user: result.user,
      }
    },
    [],
  )

  const logout = useCallback<Logout>(
    async () => {
      const result = await payloadLogout()
      if (result.success) {
        setUser(null)
      }
      return result
    }, [])

  const forgotPassword = useCallback<ForgotPassword>(
    async (args) => {
      const response = await payloadForgetPassword(args.email)
      return response
    },
    [],
  )

  const resetPassword = useCallback<ResetPassword>(
    async (args) => {
      const response = await payloadResetPassword(args.password, args.token)
      return response
    },
    [],
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