"use client"
import Link from "next/link"
import { useAuth } from "@/provider/Auth"

export default function Page() {

    const { user } = useAuth()

    return (
        <div className='flex items-center justify-center my-40'>
            <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
                <h1 className="font-bold text-lg text-center ">Welcome to the Team of Ninjas</h1>
                <p className="text-center">User Email: {user?.email}</p>
                <Link href="/" className="bg-primary text-white px-4 py-2 rounded-lg">Pay Contribution</Link>
            </div>
        </div>
    )
}
