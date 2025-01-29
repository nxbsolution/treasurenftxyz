// "use client";
// import { useState, JSX } from 'react'
// import Rules from './_components/Rules'
// import NewIssue from './_components/NewIssue'
// import ExistingUpdate from './_components/ExistingUpdate'

export default function Page() {

    return (
        <div className='flex items-center justify-center my-40'>
            <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
                <h1 className="font-bold text-lg text-center ">We are building something amazing for you. Check back soon!</h1>
            </div>
        </div>
    )

    //     const object: { [key: string]: JSX.Element } = {
    //         "Rules": <Rules />,
    //         "New Issue": <NewIssue />,
    //         "Existing update": <ExistingUpdate />
    //     }
    //     console.log(object)

    //     const tabs = ["Rules", "New Issue", "Existing update"]
    //     const [activeTab, setActiveTab] = useState<keyof typeof object | "">("")
    //     return (
    //         <div className='mt-6'>

    //             <div className='space-x-4 flex justify-center'>
    //                 {tabs.map((tab, index) => (
    //                     <button
    //                         onClick={() => setActiveTab(tab)}
    //                         key={index}
    //                         className=' px-6 py-3 ring-2 text-lg rounded-lg ring-primary font-bold hover:text-primary hover:shadow-[6px_6px_0px_hsl(var(--primary))] duration-500 hover:-translate-y-[1px]'>
    //                         {tab}
    //                     </button>
    //                 ))
    //                 }
    //             </div>
    //             <div>
    //                 {activeTab && object[activeTab]}
    //             </div>
    //         </div>
    //     )
}
