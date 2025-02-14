import DashboardCards from "./_components/DashboardCards"
import NotificationCards from "./_components/NotificationCards"
import NotificationModel from "./_components/NotificationModel"

export default function Page() {

    return (
        <div className="container mx-auto space-y-6 max-sm:space-y-10 py-10">
            <NotificationModel />
            <NotificationCards />
            <DashboardCards />
        </div>
    )
}
