import { getMemberNotifications, getUser } from "@/provider/Auth/payloadFunctions"
import DashboardCards from "./_components/DashboardCards"
import NotificationCards from "./_components/NotificationCards"
import NotificationModel from "./_components/NotificationModel"

export default async function Page() {

    const { member } = await getUser()
    const { notifications, error } = await getMemberNotifications(member?.id)

    return (
        <div className="container mx-auto space-y-6 max-sm:space-y-10">
            <NotificationModel notifications={notifications.filter((ntfc) => ntfc.priority === 'HIGH')} />
            <NotificationCards notifications={notifications} error={error} />
            <DashboardCards />
        </div>
    )
}
