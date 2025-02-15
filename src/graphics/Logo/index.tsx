import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <Image
      src='/logo.jpg'
      alt='logo'
      width={240}
      height={60}
      className='object-contain rounded-lg' />
  )
}