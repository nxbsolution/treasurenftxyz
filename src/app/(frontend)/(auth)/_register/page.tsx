// "use client"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { useState } from "react"
// import MemberDetails from "../signup/_components/MemberDetails"
// import NotAllowed from "../signup/_components/NotAllowed"
// import { useAuth } from '@/provider/Auth'
// import { redirect } from "next/navigation"

// const Page = () => {
//     const [selectedTeam, setSelectedTeam] = useState('')
//     const { member } = useAuth()

//     if (!member) {
//         redirect('/dashboard')
//     }

//     return (
//         <>
//             <h1 className='m-5 text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Register Yourself </h1>
//             <div className='border shadow-lg p-8 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-10'>
//                 <h1 className="text-center font-semibold text-2xl">Select Your Team</h1>
//                 <RadioGroup defaultValue="" onValueChange={(value) => setSelectedTeam(value)}>
//                     <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="ninja" id="r1" />
//                         <Label htmlFor="r1">Ninja Team</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="other" id="r2" />
//                         <Label htmlFor="r2">Other</Label>
//                     </div>
//                 </RadioGroup>
//             </div>
//             <div>
//                 {
//                     selectedTeam && (selectedTeam === 'ninja' ? <MemberDetails /> : <NotAllowed />)
//                 }
//             </div>

//         </>
//     )
// }

// export default Page



