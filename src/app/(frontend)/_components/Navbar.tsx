'use client'
import Image from 'next/image'
import React, { useState } from 'react'
// import logo from '@/app/(frontend)/_assets/logo/reverse-logo.png'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronsDown, Menu, CircleUser } from 'lucide-react'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'


const NavBar = ({ }) => {
    // const [open, setOpen] = useState(false)
    // const [dropdownOpen, setDropdownOpen] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false)



    return (
        <div className='flex sticky justify-between top-0 bg-primary items-center z-50 px-16 max-md:px-10 max-sm:px-8 max-xs:px-2 py-4'>
            <div className='flex gap-6'>
                <Link href="/" aria-label='home'>
                    <div className='w-48 max-sm:w-36 aspect-[4/1] relative mr-4'>
                        <Image
                            src=''
                            alt='logo'
                            fill
                            className='object-contain' />
                    </div>
                </Link>
                {/* <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild className='max-lg:hidden'>
                        <Button className='border-2 rounded-xl text-lg p-6 hover:bg-card focus-visible:ring-card focus-visible:ring-0 hover:text-foreground'>Explore Courses <ChevronsDown strokeWidth={3} /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-72 space-y-2 p-4 rounded-xl  bg-card font-openSans' onClick={() => setDropdownOpen(false)}>
                        {departments.map(({slug,title}) => (
                            <Link href={`/departments/${slug}`} key={title}>
                                <DropdownMenuLabel className='hover:text-card hover:bg-primary-400 group cursor-pointer p-4 rounded-xl text-base text-muted-foreground flex justify-between'>
                                    {title}
                                    <ArrowRight strokeWidth={2} className='invisible group-hover:visible' />
                                </DropdownMenuLabel>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
            <div className='space-x-4'>
                {isLoggedIn ? (
                    <CircleUser size={34} className='text-background' />
                ) : (
                    <Link href={'/login'}>
                        <Button className='border-2 rounded-xl text-lg max-sm:text-base p-6 max-sm:p-4 hover:bg-card hover:text-foreground focus-visible:ring-card focus-visible:ring-0'>Login</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default NavBar
