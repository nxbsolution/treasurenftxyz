"use client";
import { useState, JSX, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Rules from './_components/Rules'
import NewIssue from './_components/NewIssue'
import ExistingUpdate from './_components/ExistingUpdate'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const Tabs: { [key: string]: JSX.Element } = {
    "Rules": <Rules />,
    "New Issue": <NewIssue />,
    "Existing Update": <ExistingUpdate />
  }

  const [activeTab, setActiveTab] = useState<keyof typeof Tabs | "">(
    (searchParams.get('tab') as keyof typeof Tabs) || "Rules"
  )

  // Update URL when tab changes
  useEffect(() => {
    router.replace(`?tab=${activeTab}`, { scroll: false })
  }, [activeTab, router])

  return (
    <div className='mt-6'>
      <div className='space-x-4 flex justify-center' role="tablist">
        {Object.keys(Tabs).map((tab, index) => (
          <button
            onClick={() => setActiveTab(tab)}
            key={index}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-panel`}
            tabIndex={activeTab === tab ? 0 : -1}
            className={`px-6 py-3 ring-2 text-lg rounded-lg ring-primary font-bold 
              ${activeTab === tab ? 'bg-primary text-white' : 'hover:text-primary hover:shadow-[6px_6px_10px_hsl(var(--primary))] duration-500 hover:-translate-y-[1px]'}`}>
            {tab}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${activeTab}-panel`}
        aria-labelledby={`${activeTab}-tab`}
      >
        {Tabs[activeTab]}
      </div>
    </div>
  )
}
