import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { FormSchema } from "./formFieldsData"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl } from "@/components/ui/form"

interface BaseField {
  name: "email" | "password" | "confirmPassword" | "country" | "realName" | "uplineUid" | "uid" | "uplineName" | "city" | "mobile" | "TRC-20" | "BEP-20";
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  description: string;
}

interface SelectField extends BaseField {
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

interface TextField extends BaseField {
  options?: never;
}

export type CustomFields = SelectField | TextField;


export const PasswordField = ({ field, formField }: { field: CustomFields, formField: UseFormReturn<z.infer<typeof FormSchema>> }) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={field.placeholder}
        {...formField}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ?
          <Eye size={16} /> :
          <EyeOff size={16} />
        }
      </Button>
    </div>
  )
}

export const SelectField = ({ field, formField }: { field: CustomFields, formField: any }) => {
  return (

    <Select onValueChange={(value) => { formField.onChange(value) }} defaultValue={undefined}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={field.placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {field.options?.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}