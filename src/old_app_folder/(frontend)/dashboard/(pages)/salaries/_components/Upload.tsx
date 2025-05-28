import {
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SalaryForm } from "./SalaryForm"

export default function Upload({ form, ProgressReportPrompt, starPrompt }: {
  form: SalaryForm,
  ProgressReportPrompt: string,
  starPrompt: string
}) {
  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Upload</h1>

      <FormField
        control={form.control}
        name="membersScreenshot"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel className="required">Members Screenshot:</FormLabel>
            <FormControl>
              <Input type="file" {...field} onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)} />
            </FormControl>
            <FormDescription>
              {ProgressReportPrompt}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="starCertificate"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel className="required">Star Certificate:</FormLabel>
            <FormControl>
              <Input type="file" {...field} onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)} />
            </FormControl>
            <FormDescription>
              {starPrompt}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

    </div >
  )
}
