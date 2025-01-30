'use client'

// import type { Permissions } from 'payload/auth'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { User } from '../../payload-types'
import type { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

import { gql, USER } from './gql'
import { rest } from './rest'

// import { getMemberByUserId } from './getMemberByUserId'
import { createMember, createUser } from './createMember'
import { redirect } from 'next/navigation'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ api?: 'gql' | 'rest'; children: React.ReactNode }> = ({
  api = 'rest',
  children,
}) => {

  const [user, setUser] = useState<null | User>()
  // const [member, setMember] = useState<null | Member>()
  // const [permissions, setPermissions] = useState<null | Permissions>(null)

  useEffect(() => { console.log({ AuthProvider: "AuthProvider", user }) }, [user]);

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
          {},
          {
            method: 'GET',
          },
        )
        if (!user) {
          setTimeout(() => redirect("/login"), 1000)
        }
        setUser(user)
      }

      if (api === 'gql') {
        const { meUser } = await gql(`query {
          meUser {
            user {
              ${USER}
            }
            exp
          }
        }`)

        setUser(meUser.user)
      }
    }

    void fetchMe()
  }, [api])

  const create = useCallback<Create>(
    async (args) => {
      const { username, password, email, ...rest } = args
      const createdUser = await createUser({ username, password, email })
      await createMember({ ...rest, user: createdUser?.id || 0 })

      setUser(createdUser)
      return createdUser

      if (api === 'gql') {
        const { createUser: user } = await gql(`mutation {
        createUser(data: { email: "${args.email}", password: "${args.password}", username: "${args.username}" }) {
          ${USER}
        }
      }`)

        setUser(user)
        return user
      }
    },
    [api],
  )

  const login = useCallback<Login>(
    async (args) => {
      if (api === 'rest') {
        const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, args)
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { loginUser } = await gql(`mutation {
        loginUser(email: "${args.email}", password: "${args.password}") {
          user {
            ${USER}
          }
          exp
        }
      }`)

        setUser(loginUser?.user)
        return loginUser?.user
      }
    },
    [api],
  )

  const logout = useCallback<Logout>(async () => {
    if (api === 'rest') {
      await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`)
      setUser(null)
      return
    }

    if (api === 'gql') {
      await gql(`mutation {
        logoutUser
      }`)

      setUser(null)
    }
  }, [api])

  const forgotPassword = useCallback<ForgotPassword>(
    async (args) => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
          args,
        )
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { forgotPasswordUser } = await gql(`mutation {
        forgotPasswordUser(email: "${args.email}")
      }`)

        return forgotPasswordUser
      }
    },
    [api],
  )

  const resetPassword = useCallback<ResetPassword>(
    async (args) => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
          args,
        )
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { resetPasswordUser } = await gql(`mutation {
        resetPasswordUser(password: "${args.password}", token: "${args.token}") {
          user {
            ${USER}
          }
        }
      }`)

        setUser(resetPasswordUser.user)
        return resetPasswordUser.user
      }
    },
    [api],
  )

  return (
    <Context.Provider
      value={{
        create,
        forgotPassword,
        login,
        logout,
        // permissions,
        // setPermissions,
        resetPassword,
        setUser,
        user,
        // member,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
