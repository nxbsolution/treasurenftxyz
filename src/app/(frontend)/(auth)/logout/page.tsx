import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { LogoutPage } from './LogoutPage'

export default async function Logout() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-900 shadow-md rounded-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">You are already logged out.</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            What would you like to do next?{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              Go to the home page
            </Link>{' '}
            or{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              log back in
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return <LogoutPage />
}

