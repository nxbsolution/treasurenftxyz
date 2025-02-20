import React, { useState } from 'react'

export default function Rules() {
    const [selectedStar, setSelectedStar] = useState('1')

    const starRules = {
        '1': {
            title: 'One-star⭐ NFT Ambassadors',
            requirements: 'Requirements: 15 members of community team A + 60 members of community team BC.',
            salary: '240USDT per month'
        },
        '2': {
            title: 'Two-star⭐⭐ NFT Ambassadors',
            requirements: 'Achievement condition: 25 members of community team A level + 150 members of BC level.',
            salary: '420USDT per month'
        },
        '3': {
            title: 'Three-star⭐⭐⭐ NFT Ambassadors',
            requirements: 'Achievement condition: 30 members of community team A level + 500 members of BC level.',
            salary: '600USDT per month'
        },
        '4': {
            title: 'Four-star⭐⭐⭐⭐ NFT Ambassadors',
            requirements: 'Achievement condition: 50 members of community team A level + 1000 members of BC level.',
            salary: '960USDT per month'
        },
        '5': {
            title: 'Five-star⭐⭐⭐⭐⭐ NFT Ambassadors',
            requirements: 'Achievement condition: 60 members of community team A level + 1500 members of BC level.',
            salary: '1800USDT per month'
        },
        '6': {
            title: 'Six-star⭐⭐⭐⭐⭐⭐ NFT Ambassadors',
            requirements: 'Achievement condition: 80 members of community team A level + 2500 members of BC level.',
            salary: '4200USDT per month'
        }
    }

    const terms = [
        '🔹 A steady 28% of new additions per month will continue to be received and entitle you to upgrade to higher level positions',
        '🔹 Monthly exceeds the new 50% additional 100-1000 U.S. dollars',
        '🔹 Minimum participants to reach the LV2 level conditions of the enthusiasts',
        '🔹 Reconciliation and payroll on the 30th of each month'
    ]

    return (
        <div className='flex items-center justify-center mt-10'>
            <div className="flex flex-col bg-card items-center justify-center space-y-8 shadow-lg rounded-xl p-8">
                <h1 className="font-bold text-lg text-center">Treasure-NFT Community Star Job Salary Description</h1>

                <select
                    value={selectedStar}
                    onChange={(e) => setSelectedStar(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    {Object.keys(starRules).map((star) => (
                        <option key={star} value={star}>
                            {starRules[star as keyof typeof starRules].title}
                        </option>
                    ))}
                </select>

                <div className="space-y-4 w-full">
                    <h2 className="font-bold">{starRules[selectedStar as keyof typeof starRules].title}</h2>
                    <p>{starRules[selectedStar as keyof typeof starRules].requirements}</p>
                    <p className="font-bold text-lg text-primary">Salary: {starRules[selectedStar as keyof typeof starRules].salary}</p>
                </div>

                <div className="border-t pt-4 w-full">
                    <h3 className="font-bold mb-4">Position Terms:</h3>
                    {terms.map((term, index) => (
                        <p key={index} className="mb-2">{term}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
