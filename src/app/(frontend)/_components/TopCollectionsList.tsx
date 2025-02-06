import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Penguin, iconT, logo } from '../_assets/images'

export default function TopCollectionsList() {
    return (
        <div className='grow border-l-2 ring-gray-300 space-y-4 px-8 overflow-auto'>
            <h1 className='font-bold text-lg '>TOP COLLECTIONS OVER</h1>
            <span className='text-gray-400'>Last 24 Hours</span>
            <div className="flex justify-end">
                <Button className='bg-gradient-to-r bg-clip-text from-blue-500 to-red-500 border-2 border-blue-500  border-b-red-500 text-transparent rounded-2xl font-bold'>More</Button>
            </div>
            {Array(5).fill(0).map((_, index) =>
                <div key={index} className='flex justify-between mt-6 pt-6'>
                    <div className=' flex items-center gap-2'>
                        <span className='font-bold text-xl'>{index + 1}</span>
                        <div className='flex gap-2'>
                            <div className='w-12 aspect-square relative rounded-full'>
                                <Image
                                    src={Penguin}
                                    alt="penguin"
                                    fill
                                    className='object-contain rounded-full'
                                />
                            </div>
                            <div>
                                <p className='text-sm'>PEPE Frog Nobility</p>
                                <div className='flex items-center gap-2'>
                                    <div className='w-4 aspect-square relative rounded-full'>
                                        <Image
                                            src={iconT}
                                            alt="penguin"
                                            fill
                                            className='object-contain rounded-full'
                                        />
                                    </div>
                                    <span className='font-semibold'>278.18M</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className='font-bold text-xl'>+1.63%</h2>
                </div>
            )}

        </div>
    )
}
