import React from 'react'
import { Penguin, iconT, logo } from '../_assets/images'
import Image from 'next/image'
import TopCollectionGrid from './TopCollectionGrid'
import TopCollectionsList from './TopCollectionsList'


export default function TopCollection() {
    return (
        <div className='lg:flex bg-card py-4  px-10 max-md:px-4 pt-20 max-lg:space-y-8'>
            <TopCollectionGrid />
            <TopCollectionsList />
        </div>
    )
}
