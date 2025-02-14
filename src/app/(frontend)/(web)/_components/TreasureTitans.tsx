'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import TreasureImg from '../_assets/images/TreasureTitan.jpg'
import Autoplay from "embla-carousel-autoplay"

const TreasureTitans = ({ TreasureTitonImg }: any) => {
    const plugin = React.useRef(
        Autoplay({ delay: 1500, stopOnInteraction: true, playOnInit: true })
    )
    return (
        <div className='space-y-2 max-sm:space-y-1 max-sm:px-1 px-2'>
            <h1 className='p-4 max-sm:p-3 max-xs:p-1 text-4xl font-semibold max-lg:text-3xl max-sm:text-2xl max-xs:text-xl'>Treasure Titons</h1>
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={() => {
                    plugin.current.reset()
                    plugin.current.play()
                }}
            >
                <CarouselContent className='mx-auto w-full'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="lg:basis-1/3 sm:basis-1/2 ">
                            <div className="p-1">
                                <div className='relative w-full aspect-video'>
                                    <Image
                                        alt='Treasure Img'
                                        src={TreasureTitonImg || TreasureImg}
                                        sizes='(min-width: 1024px) 50vw,(min-width: 640px) 100vw, 33vw'
                                        fill
                                        className='rounded-xl object-cover'
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </div>
    )
}

export default TreasureTitans
