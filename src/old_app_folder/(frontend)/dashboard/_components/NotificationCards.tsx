import { Notification } from "@/payload-types"
import NotificationCard from "./NotificationCard"
import Link from "next/link"

export default function NotificationCards({ notifications, error }: { notifications: Notification[], error: string | null }) {

  if (error || !notifications.length) {
    return (
      <div className="bg-card shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center text-primary mb-3">You&#39;re All Caught Up!</h1>
        <p className="text-gray-600 text-base text-center">We&#39;ll notify you here when there&#39;s something new to see</p>
      </div>
    )
  }


  return (
    <div className="bg-card shadow-lg rounded-xl p-8 ">
      <div className="max-h-80 overflow-y-scroll space-y-4">
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
      <h3 className="text-end text-sm font-bold underline text-blue-800 mt-2">
        <Link href="/dashboard/alerts-notifications">see all notifications</Link>
      </h3>
    </div>
  )
}