import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { LogoutPage } from './LogoutPage'
import { Button } from '@/components/ui/button'

export default async function Logout() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-900 shadow-md rounded-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">You are already logged out.</h1>
          <Link href={"/login"}>
            <Button
              variant={"outline"}
              className={`w-full border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white`}>Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <LogoutPage />
}

