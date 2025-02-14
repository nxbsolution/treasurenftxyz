import React from 'react'
import HomePageHeader from './_components/WebHeader'

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <HomePageHeader />
            {children}
        </div>
    )
}

export default layout
