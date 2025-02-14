import NotificationCard from "./NotificationCard"
import Link from "next/link"
import { getMemberNotifications } from "@/provider/Auth/payloadFunctions"


export default async function NotificationCards() {

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
    <>
      {notifications.map((notification) => (
        <NotificationCard
          time="123123"
          key={notification.id}
          LinkTo={notification.linkTo as string}
          statement={notification.statement}
          variant={"success"}
        />
      ))}
      <h3 className="text-end text-sm font-bold underline text-blue-800">
        <Link href="/dashboard/alerts-notifications">see all notifications</Link>
      </h3>
    </>

  )
}