import Link from "next/link";

import { getMemberNotifications } from "@/provider/Auth/payloadFunctions"
import NotificationCard from "../../_components/NotificationCard";

export default async function Page() {

  const { notifications, error } = await getMemberNotifications()

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          No High Priority Notifications
        </h1>
        <p>
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className='container mx-auto my-10'>
      <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
        <h1 className="font-bold text-primary text-xl text-center ">Notifications</h1>
        {
          notifications.length ? (
            notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                LinkTo={notification.linkTo as string}
                statement={notification.statement}
                time={notification.createdAt}
                variant={notification.priority === "HIGH" ? "error" : "warning"}
              />
            ))
          ) : (
            <p>No Notifications Found</p>
          )
        }

        <Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg">Return to Dashboard</Link>
      </div>
    </div>
  )
}
