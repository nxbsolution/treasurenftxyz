import Image from 'next/image'
import React from 'react'
import HeroImg from '../_assets/images/HeroImg.jpg'

const HeroSection = ({ heroImg }: any) => {
    return (
        <div className='relative w-full aspect-[1280/433] mx-auto'>
            <Image
                alt='hero'
                src={heroImg || HeroImg}
                sizes='100vw'
                fill
                quality={100}
                priority
                className='object-cover'
            />
        </div>
    )
}

export default HeroSection
