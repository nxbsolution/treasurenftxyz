import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function LoadingSkeleton() {
  return <div className="mb-8 pt-4">
    <div className="mx-auto container p-4 max-w-2xl space-y-4">
      <div className='flex max-xs:flex-col justify-center items-center gap-2'>
        <div className='w-28 aspect-[319/196] relative'>
          <Image
            src='/img1.jpg'
            alt='logo'
            fill
            className='object-contain  rounded-lg' />
        </div>
        <h1 className="text-3xl text-center font-bold py-2">
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground'>Welcome To The Team of Ninjas </span>🥷
        </h1>
      </div>
      <div className="lg:col-span-2 p-6 bg-card shadow-md shadow-foreground rounded-3xl space-y-4 ring-primary ">
        <h2 className="font-semibold text-center text-bold text-lg">User Information</h2>
        {Array(7).fill(1).map((_, i) => <Skeleton key={i} className='h-8 rounded-xl w-full bg-gray-200' />)}
      </div>
    </div>
  </div>
}