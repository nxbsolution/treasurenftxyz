import Link from "next/link";

import { getMemberNotifications, getUser } from "@/provider/Auth/payloadFunctions"
import NotificationCard from "../../_components/NotificationCard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
  }>
}) {

  const { member } = await getUser()
  const currentPage = Number((await searchParams).page) || 1
  const { notifications, totalPages, hasNextPage, hasPrevPage } = await getMemberNotifications(member?.id, currentPage)

  return (
    <div className='container mx-auto my-10'>
      <div className="flex flex-col bg-card items-center justify-center space-y-8 shadow-lg rounded-xl p-8">
        <h1 className="font-bold text-primary text-xl text-center">Notifications</h1>
        {/* Notifications list */}
        {notifications.length ? (
          <>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                LinkTo={notification.linkTo as string}
                statement={notification.statement}
                time={notification.createdAt}
                variant={notification.priority === "HIGH" ? "error" : "warning"}
              />
            ))}

            {/* Pagination Controls */}
            <div className="flex gap-4 mt-4">
              {hasPrevPage && (
                <Link
                  href={`/dashboard/alerts-notifications?page=${currentPage - 1}`}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Previous
                </Link>
              )}
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              {hasNextPage && (
                <Link
                  href={`/dashboard/alerts-notifications?page=${currentPage + 1}`}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Next
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-600">You&#39;re All Caught Up!</h2>
            <p className="mt-2 text-gray-500">Check back later for new notifications.</p>
          </div>
        )}

        <Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg">Return to Dashboard</Link>
      </div>
    </div>
  )
}