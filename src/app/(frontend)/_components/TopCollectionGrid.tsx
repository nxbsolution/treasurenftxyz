import React from 'react'

import { Penguin, iconT, logo } from '../_assets/images'
import Image from 'next/image'

export default function TopCollectionGrid() {
    return (
        <div className='grow  grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
                <div className='w-full aspect-square rounded-l-xl relative'>
                    <Image
                        src={Penguin}
                        alt="penguin"
                        fill
                        className='object-cover rounded-xl'
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <div className='w-12 aspect-square relative rounded-full'>
                            <Image
                                src={logo}
                                alt="penguin"
                                fill
                                className='object-cover rounded-full'
                            />
                        </div>
                        <span className='font-bold'>CoolAPE_212459</span>
                    </div>
                    <div className='space-y-2'>
                        <span>Highest Bid</span>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 aspect-square relative rounded-full'>
                                <Image
                                    src={iconT}
                                    alt="penguin"
                                    fill
                                    className='object-cover rounded-full'
                                />
                            </div>
                            <span>278.18 USDT</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='md:space-y-4  max-md:flex flex-wrap  max-md:gap-4 '>
                {
                    Array(3).fill(0).map((_, index) =>
                        <div key={index} className='md:flex gap-2  mx-auto'>
                            <div className='md:w-32 w-full aspect-square rounded-l-xl relative'>
                                <Image
                                    src={Penguin}
                                    alt="penguin"
                                    fill
                                    className='object-cover rounded-xl'
                                />
                            </div>
                            <div className='space-y-2'>
                                <span className='font-bold'>CoolAPE_212459</span>
                                <div className='flex gap-2'>
                                    <div className='w-10 aspect-auto relative rounded-full'>
                                        <Image
                                            src={logo}
                                            alt="penguin"
                                            fill
                                            className='object-contain rounded-full'
                                        />
                                    </div>
                                    <div className='ring-1 ring-green-400 rounded-lg px-4 py-1 flex items-center gap-2'>
                                        <div className='md:w-4 aspect-square relative rounded-full'>
                                            <Image
                                                src={iconT}
                                                alt="penguin"
                                                fill
                                                className='object-contain rounded-full'
                                            />
                                        </div>
                                        <span className='font-bold'>278.18</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
