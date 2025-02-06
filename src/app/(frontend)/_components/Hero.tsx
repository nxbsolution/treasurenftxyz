import React from 'react'

import { ChartNoAxesCombinedIcon, CalendarCheck2 } from 'lucide-react'

export default function Hero() {
    return (
        <div className='bgImg flex max-lg:flex-col  my-auto items-center justify-center gap-6 px-20 py-4 max-sm:px-4 h-[25rem] max-md:h-fit'>
            <div className=''>
                <h1 className='font-bold text-2xl'>Explore, Discover and Earn Big with one of the top Web3 NFT Marketplaces in the world</h1>
            </div>
            <div className='flex gap-4'>
                <span><ChartNoAxesCombinedIcon /></span>
                <div >
                    <div className='space-y-4'>
                        <h2 className='text-xl font-bold'>
                            Multi-Reward
                        </h2>
                        <p>TreasureNFT leverages a proprietary AI-powered algorithmic trading model, and provides a dual earnings mechanism with trading rewards as well as referral rewards.</p>

                    </div>

                </div>
            </div>
            <div className='flex gap-4'>
                <span><CalendarCheck2 /></span>
                <div >
                    <div className='space-y-4'>
                        <h2 className='text-xl font-bold'>
                            Earn Future Value
                        </h2>
                        <p>TreasureNFT reduces the entry hurdles of the NFT market and expands the boundaries of the NFT collection & trading through its innovative AI algorithmic trading process and rewarding financial model.</p>

                    </div>

                </div>
            </div>
        </div>
    )
}
