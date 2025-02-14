import {
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Member } from "@/payload-types";
import { UseFormReturn } from "react-hook-form"
import { SalaryForm } from "./SalaryForm";

export default function MemberDetail({ form, member }: {
  member: Member | undefined | null,
  form: SalaryForm
}) {
  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Member Detail</h1>

      <FormField
        control={form.control}
        name="uid"
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel>UID:</FormLabel>
            <FormControl>
              <Input disabled defaultValue={member?.uid ?? ""} {...field} />
            </FormControl>
            <FormDescription>
              Your NFT UID
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="realName"
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel>Real Name:</FormLabel>
            <FormControl>
              <Input disabled defaultValue={member?.realName ?? ""} {...field} />
            </FormControl>
            <FormDescription>
              Your Real Name
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="TRC-20"
        render={({ field: { value, ...field } }) => (
          <FormItem>
            <FormLabel className="required">TRC-20 Deposite Address:</FormLabel>
            <FormControl>
              <Input required
                defaultValue={member?.depositAddress["TRC-20"] !== "N/A" ? member?.depositAddress["TRC-20"] : ""}
                {...field} />
            </FormControl>
            <FormDescription>
              Enter Your TRC-20 Deposite Address
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

    </div >
  )
}