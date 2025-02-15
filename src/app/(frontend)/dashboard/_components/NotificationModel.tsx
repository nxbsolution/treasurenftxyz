'use client'
import { useState } from "react"
import { X } from 'lucide-react';
import NotificationCard from './NotificationCard';
import { Notification } from "@/payload-types";

export default function NotificationModel({ notifications }: { notifications: Notification[] }) {

  const [isOpen, setIsOpen] = useState(notifications.length > 0)

  return <Model isOpen={isOpen} onClose={() => setIsOpen(false)} notifications={notifications} />
}

function Model({ isOpen, onClose, notifications }: {
  isOpen: boolean,
  onClose: () => void,
  notifications: Notification[]
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
            <div className="w-full p-5 space-y-4">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  LinkTo={notification.linkTo as string}
                  statement={notification.statement}
                  time={notification.createdAt}
                  variant={notification.priority === "HIGH" ? "warning" : "info"}
                />
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
