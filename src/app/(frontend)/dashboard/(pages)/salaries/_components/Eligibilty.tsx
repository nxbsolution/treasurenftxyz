import NotificationCard from "../../../_components/NotificationCard";
import { getEligibility } from "../../star-ambassadors/_components/starFromData";

export default function Eligibilty({ isEligible }: { isEligible: ReturnType<typeof getEligibility> }) {
  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card m-6'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'> Eligibilty</h1>
      <NotificationCard LinkTo="Eligibilty" variant={isEligible.star === "0star" ? "error" : "info"} statement={`You are ${isEligible.message}`} />
    </div >
  )
}