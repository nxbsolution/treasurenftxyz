import SalaryForm from "./_components/SalaryForm";
import { getSalaryFormSettings } from "./_actions/GetSalaryFormSettings";
import { unstable_cache } from "next/cache";
import { getUser } from "@/provider/Auth/payloadFunctions";
import LoadingSkeleton from "../contribution/_components/LoadingSkeleton";

const getCachedSalaryFormSettings = unstable_cache(
  async () => {
    return await getSalaryFormSettings();
  },
  ['salary-form-settings'],
  {
    tags: ['salary-form-settings']
  }
);

export default async function Page() {
  const { data: formSettings, error } = await getCachedSalaryFormSettings();

  const { member } = await getUser()

  if (error) {
    return (
      <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-5'>
        <h1 className='text-3xl text-center font-bold text-red-500 max-sm:text-2xl max-sm:font-semibold'>OOPS! Something Went Wrong</h1>
        <p className='text-center text-red-500'>{error}</p>
      </div>
    )
  }

  if (!formSettings) {
    return (
      <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-5'>
        <h1 className='text-3xl text-center font-bold text-red-500 max-sm:text-2xl max-sm:font-semibold'>OOPS! Something Went Wrong</h1>
        <p className='text-center text-red-500'>No Data Found</p>
      </div>
    )
  }

  if (!formSettings.openSalaryForm) {
    return (
      <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card mt-5'>
        <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl'>Salary Form</h1>
        <p className='text-center text-red-500'>
          Salary applications is not open yet. Stay tuned for updates! 🚀
        </p>
      </div >
    )
  }

  if (!member) {
    return <LoadingSkeleton />
  }

  return (
    <SalaryForm formSettings={formSettings} member={member} />
  )

}