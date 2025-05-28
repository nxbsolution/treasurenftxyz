import Link from "next/link";

export default function Page() {
  return (
    <div className='flex items-center justify-center my-40'>
      <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
        <h1 className="font-bold text-lg text-center ">We are building something amazing for you. Check back soon!</h1>
        <Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg">Return to Dashboard</Link>
      </div>
    </div>
  )
}