"use client";
import { useState } from 'react'
import Rules from './_components/Rules'
import NewIssue from './_components/NewIssue'
import ExistingUpdate from './_components/ExistingUpdate'

export default function Page() {

    const object = {
        "Rules": <Rules />,
        "New Issue": <NewIssue />,
        "Existing update": <ExistingUpdate />
    }
    console.log(object)

    const tabs = ["Rules", "New Issue", "Existing update"]
    const [activeTab, setActiveTab] = useState("")
    return (
        <div className='mt-6'>

            <div className='space-x-4 flex justify-center'>
                {tabs.map((tab, index) => (
                    <button
                        onClick={() => setActiveTab(tab)}
                        key={index}
                        className=' px-6 py-3 ring-2 text-lg rounded-lg ring-primary font-bold hover:text-primary hover:shadow-[6px_6px_0px_hsl(var(--primary))] duration-500 hover:-translate-y-[1px]'>
                        {tab}
                    </button>
                ))
                }
            </div>
            <div>
                {activeTab && object[activeTab]}
            </div>
        </div>
    )
}
