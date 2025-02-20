import {
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { SalaryForm } from "./SalaryForm";


export default function GrowthRate({ form, teamAPrompt, teamBCPrompt }: {
  form: SalaryForm,
  teamAPrompt: string,
  teamBCPrompt: string
}) {

  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Growth Rate</h1>

      <FormField
        control={form.control}
        name="star"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='required'>Select Your Star</FormLabel>
            <Select
              {...field}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a star" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1star" className="hover:!bg-blue-100">
                  <Star size={14} className="stroke-orange-400 fill-orange-400" />
                </SelectItem>
                <SelectItem value="2star" className="hover:!bg-blue-100">
                  <div className="flex gap-2">
                    {Array(2).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                  </div>
                </SelectItem>
                <SelectItem value="3star" className="hover:!bg-blue-100">
                  <div className="flex gap-2">
                    {Array(3).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                  </div>
                </SelectItem>
                <SelectItem value="4star" className="hover:!bg-blue-100">
                  <div className="flex gap-2 ">
                    {Array(4).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                  </div>
                </SelectItem>
                <SelectItem value="5star" className="hover:!bg-blue-100">
                  <div className="flex gap-2">
                    {Array(5).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                  </div>
                </SelectItem>
                <SelectItem value="6star" className="hover:!bg-blue-100">
                  <div className="flex gap-2">
                    {Array(6).fill(0).map((_, i) => (<Star key={i} size={14} className="fill-orange-400 stroke-orange-400" />))}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Select your star level.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="membersA"
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel className="required">Members A ({teamAPrompt}):</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription>
              {teamAPrompt}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="membersBC"
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel className="required">Team B + C ({teamBCPrompt}):</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription>
              {teamBCPrompt}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

    </div >
  )
}
