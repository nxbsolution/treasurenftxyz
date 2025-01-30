'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/provider/Auth'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'
import SideBar from './SideBar'


const Header = ({ }) => {
    const { user } = useAuth()
    useEffect(() => {
        setIsLoggedIn(user ? true : false)
    }, [user])

    const [isLoggedIn, setIsLoggedIn] = useState(false)



    return (
        <div className='flex sticky justify-between top-0 bg-primary items-center z-50 px-16 max-md:px-10 max-sm:px-8 max-xs:px-2 py-4'>
            <div className='flex items-center gap-6'>
                <SideBar isLoggedIn={isLoggedIn} />
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
            <div className='flex space-x-3'>
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
                        <Button className='text-lg text-card hover:underline'>Sign Up</Button>
                    </Link>
                    <Link href={'/login'}>
                        <Button className='border-2 rounded-xl text-lg max-sm:text-base p-6 text-card max-sm:p-4 hover:bg-card hover:text-foreground focus-visible:ring-card focus-visible:ring-0'>Login</Button>
                    </Link>
                </>
                )}
            </div>
        </div>
    )
}

export default Header
