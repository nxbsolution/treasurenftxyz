'use client'
import Image from 'next/image'
import React, { useState } from 'react'
// import logo from '@/app/(frontend)/_assets/logo/reverse-logo.png'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronsDown, Menu, CircleUser } from 'lucide-react'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import SideBar from './SideBar'


const NavBar = ({ }) => {
    // const [open, setOpen] = useState(false)
    // const [dropdownOpen, setDropdownOpen] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false)



    return (
        <div className='flex sticky justify-between top-0 bg-primary items-center z-50 px-16 max-md:px-10 max-sm:px-8 max-xs:px-2 py-4'>
            <div className='flex items-center gap-6'>
                <SideBar />
                <div className=''>
                    <Link href="/" aria-label='home'>
                        <div className='w-48 max-sm:w-36 aspect-[4/1] relative mr-4'>
                            <Image
                                src='/logo.jpg'
                                alt='logo'
                                fill
                                className='object-contain' />
                        </div>
                    </Link>
                </div>
            </div>
            <div className='space-x-4 hidden lg:block'>
                {isLoggedIn ? (
                    <CircleUser size={34} className='text-background' />
                ) : (
                    <Link href={'/login'}>
                        <Button className='border-2 rounded-xl text-lg max-sm:text-base p-6 text-card max-sm:p-4 hover:bg-card hover:text-foreground focus-visible:ring-card focus-visible:ring-0'>Login</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default NavBar
