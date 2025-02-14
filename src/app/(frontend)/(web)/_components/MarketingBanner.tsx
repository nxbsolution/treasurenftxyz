import Image from 'next/image'
import React from 'react'
import FeaturesBanner from '../_assets/images/FeaturesBanner.jpg'

const MarketingBanner = ({ BannerImg }: any) => {
    return (
        <div className='relative w-full aspect-[1280/433] mx-auto'>
            <Image
                alt='Banner'
                src={BannerImg || FeaturesBanner}
                sizes='100vw'
                fill
                quality={100}
                className='object-cover'
            />
        </div>
    )
}

export default MarketingBanner
