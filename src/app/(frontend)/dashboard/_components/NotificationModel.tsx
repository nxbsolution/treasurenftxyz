'use client'
import { useState } from "react"
import { X } from 'lucide-react';
import NotificationCard from './NotificationCard';

export default function NotificationModel() {

  const [isOpen, setIsOpen] = useState(false)

  return <Model isOpen={isOpen} onClose={() => setIsOpen(false)} />
}

function Model({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) {

  return (
    <div className={`w-full h-full fixed top-0 left-0 z-40 flex justify-center items-center ${isOpen ? 'dark:bg-[rgba(255,255,255,0.50)] bg-[rgba(0,0,0,0.50)] ' : 'bg-transparent pointer-events-none'} transition-all duration-300`}>
      {isOpen &&
        <div className='container bg-background dark:bg-light-black max-w-[50rem] max-lg:max-w-[30rem] m-4 h-[90vh] overflow-auto rounded-3xl'>
          <div className='mx-4 my-2 text-end'>
            <button
              className='bg-primary rounded-md px-3 py-1.5 dark:text-black '
              onClick={onClose}>
              <X color='white' />
            </button>
          </div>
          <div>
            <div className="h-20 w-full p-5">
              <NotificationCard time="123123" LinkTo='Salary' statement='ALi' variant='success' />
            </div>
          </div>
        </div>
      }
    </div>
  )
}
