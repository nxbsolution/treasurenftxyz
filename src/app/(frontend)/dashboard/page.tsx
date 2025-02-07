"use client"
import Link from "next/link"
import { useAuth } from "@/provider/Auth"

export default function Page() {

    const { user } = useAuth()
    // if (!user) return (
    //     <div className='flex items-center justify-center my-40'>
    //         <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
    //             <h1 className="font-bold text-lg text-center ">Not Authorized</h1>
    //             <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg">Login First</Link>
    //         </div>
    //     </div>
    // )

    return (
        <div className='flex items-center justify-center my-10'>
            <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
                <h1 className="font-bold text-lg text-center ">Welcome to the Team of Ninjas</h1>
                <p className="text-center">User Email: {user?.email}</p>
                <Link href="/dashboard/contribution" className="bg-primary text-white px-4 py-2 rounded-lg">Pay Contribution</Link>
                <Link href="/dashboard/coming-soon" className="bg-primary text-white px-4 py-2 rounded-lg">Apply For Salary</Link>
                <Link href="/dashboard/coming-soon" className="bg-primary text-white px-4 py-2 rounded-lg text-center w-36">Apply For Star Ambassador Certificate</Link>
                <Link href="/dashboard/coming-soon" className="bg-primary text-white px-4 py-2 rounded-lg">Online Trainings</Link>
            </div>
        </div>
    )
}
