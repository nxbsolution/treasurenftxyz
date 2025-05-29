
'use client'

import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const lectures = [
  {
    title: "Lecture 1",
    description: "Phy101 Lecture no 5 Introduction to Physics by Sir BiLAL Kahlon",
    image: "/lecture1.avif",
    link: "https://www.youtube.com/watch?v=kL09wB66FvY"
  },
  {
    title: "Lecture 2",
    description: "What is Array in C++ | Easy Way of Array in CS201 Lecture No 11 | Introduction to Programming",
    image: "/Lecture2.webp",
    link: "https://www.youtube.com/watch?v=fqx5vPRA17g"
  },
  {
    title: "Lecture 3",
    description: "Phy101 Lecture no 7 Introduction to Physics by Sir BiLAL Kahlon",
    image: "/lecture3.avif",
    link: "https://www.youtube.com/watch?v=q_Hh3CzGcFk"
  },
  {
    title: "Lecture 4",
    description: "Phy101 Lecture no 8 Introduction to Physics by Sir BiLAL Kahlon",
    image: "/lecture4.webp",
    link: "https://www.youtube.com/watch?v=-gnJ2n8p9Tw"
  },
  {
    title: "Lecture 5",
    description: "MGT503 Lecture No 25| MGT503 Principal Of Management | MGT503 Short Lectures",
    image: "/lecture5.avif",
    link: "https://www.youtube.com/watch?v=UsFBKLK2qPU"
  },
  {
    title: "Lecture 6",
    description: "Phy101 Lecture no 4 Introduction to Physics by Sir BiLAL Kahlon",
    image: "/lecture6.webp",
    link: "https://www.youtube.com/watch?v=nH_I_OOI-XY"
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className='flex sticky container mx-auto rounded-xl my-10 max-lg:my-8 max-md:my-6 max-sm:my-4 justify-between top-0 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-300 items-center z-50 px-16 max-md:px-10 max-sm:px-8 max-xs:px-2 py-4'>
        <Button className='text-lg max-md:font-semibold max-md:text-base max-sm:text-xs hover:bg-inherit bg-inherit hover:underline text-primary'>Online Acedemy</Button>
        <div className='flex space-x-3 max-sm:space-x-0.5'>
          <Button className='text-lg text-foreground sm:translate-y-1 max-md:font-semibold max-md:text-base max-sm:text-xs hover:bg-inherit bg-inherit hover:underline'>Sign Up</Button>
          <Button className='border-2 max-sm:border rounded-xl text-lg max-md:text-base max-sm:text-xs p-6 hover:text-card text-card max-sm:p-2 max-md:font-semibold hover:bg-gray-500 bg-gray-400 focus-visible:ring-card focus-visible:ring-0'>Login</Button>
        </div>
      </div>

      <div className="relative h-64 w-full mb-8">
        <Image
          src="/image.png"
          alt="Background Image"
          fill
        />
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Popular Lectures</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture, index) => (
            <Card key={lecture.title} className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">{lecture.title}</h2>
              <p className="text-gray-600 line-clamp-2">
                {lecture.description}
              </p>
              <div className="mt-4 h-52 w-full relative">
                <Image
                  src={lecture.image}
                  fill
                  alt={lecture.title}
                />
              </div>
              <Link href={lecture.link} className="mt-4 inline-block text-center w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors">
                Watch Lecture
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
