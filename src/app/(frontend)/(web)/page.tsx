import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {

  redirect("/login")

  return (
    <div className='flex items-center justify-center my-40'>
      <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
        <h1 className="font-bold text-lg text-center ">Please Login First</h1>
        <Link href={"/login"}><Button className="text-card hover:bg-primary-foreground">Go to Login Page</Button></Link>
      </div>
    </div>
  )
}