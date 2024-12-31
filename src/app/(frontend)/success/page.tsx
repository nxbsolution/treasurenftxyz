import React from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <div className="py-8 px-8 rounded-full bg-green-700">
        <Check strokeWidth={6} size={25} className="stroke-white" />
      </div>
      <h1 className="font-bold text-lg text-center ">Your form is submitted successfully</h1>
      <Link href={"/"}><Button>Back To Home</Button></Link>
    </div>
  )
}
