'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SideBar from '../../_components/SideBar'
import Image from 'next/image'
import { CircleUser, Menu } from 'lucide-react'
import { useAuth } from '@/provider/Auth'

const HomePageHeader = () => {
    const { user } = useAuth()
    useEffect(() => {
        setIsLoggedIn(user ? true : false)
    }, [user])

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <div className='flex sticky container mx-auto rounded-xl my-10 max-lg:my-8 max-md:my-6 max-sm:my-4 justify-between top-0 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-300 items-center z-50 px-16 max-md:px-10 max-sm:px-8 max-xs:px-2 py-4'>
            <div className='flex items-center gap-6 max-sm:gap-2'>
                {/* <SideBar isLoggedIn={isLoggedIn} /> */}
                <Menu size={30} strokeWidth={2} className="stroke-foreground" />
                <div className=''>
                    <Link href="/dashboard" aria-label='home'>
                        <div className='w-48 max-xs:w-28 max-sm:w-36 aspect-[4/1] relative sm:mr-4'>
                            <Image
                                src='/logo.jpg'
                                alt='logo'
                                fill
                                className='object-contain' />
                        </div>
                    </Link>
                </div>
            </div>
            <div className='flex space-x-3 max-sm:space-x-1'>
                {user?.roles?.includes('admin') ? (<Link href={'/admin'}>
                    <Button className='text-lg text-card hover:underline max-sm:hidden'>Admin</Button>
                </Link>) : null}
                {isLoggedIn ? (<>
                    <Link href={'/logout'}>
                        <Button className='text-lg text-card hover:underline'>Log Out</Button>
                    </Link>
                    <Link href={'/dashboard'}>
                        <CircleUser size={34} className='text-background' />
                    </Link>
                </>
                ) : (<>
                    <Link href={'/signup'}>
                        <Button className='text-lg text-foreground max-md:text-base max-sm:text-sm hover:bg-inherit bg-inherit hover:underline'>Sign Up</Button>
                    </Link>
                    <Link href={'/login'}>
                        <Button className='border-2 rounded-xl text-lg max-md:text-base max-sm:text-sm p-6  text-card max-sm:p-1 hover:bg-gray-500 bg-gray-400 hover:text-foreground focus-visible:ring-card focus-visible:ring-0'>Login</Button>
                    </Link>
                </>
                )}
            </div>
        </div>
    )
}

export default HomePageHeader
