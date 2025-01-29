import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className='flex items-center justify-center my-40'>
      <div className="flex flex-col bg-card  items-center justify-center  space-y-8 shadow-lg rounded-xl p-8 ">
        {/* <div className="py-8 px-8 rounded-full bg-green-700">
          <Check strokeWidth={6} size={25} className="stroke-card" />
        </div> */}
        <h1 className="font-bold text-lg text-center ">Please Login First</h1>
        <Link href={"/login"}><Button className="text-card hover:bg-primary-foreground">Go to Login Page</Button></Link>
      </div>
    </div>
  )
}