import { admin } from "@/access/admin";
import { revalidateTag } from "next/cache";
import { GlobalConfig } from "payload";

export const salaryFormSettings: GlobalConfig = {
  slug: "salary-form-settings",
  hooks: {
    afterChange: [
      () => revalidateTag('salary-form-settings')
    ]
  },
  access: {
    read: admin
  },
  fields: [
    {
      name: "openSalaryForm",
      label: "Open Salary Form",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "teamAPrompt",
      label: "Input Team A Prompt",
      type: "text",
      defaultValue: "Please provide the salary details for Team A:",
      required: true,
    },
    {
      name: "teamBCPrompt",
      label: "Input Team B+C Prompt",
      type: "text",
      defaultValue: "Please provide the salary details for Team B/C:",
      required: true,
    },
    {
      name: "minGrowthRate",
      label: "Minimum Growth Rate",
      type: "number",
      required: true,
    },
    {
      name: "progressReportPrompt",
      label: "Upload Progress Report Prompt",
      type: "text",
      required: true,
    },
    {
      name: "uploadStarPrompt",
      label: "Upload Star Prompt",
      type: "text",
      required: true,
    },
    {
      name: "videoLink",
      label: "Youtube Video Link",
      type: "text",
      // required: true,
      admin: {
        description: "Please provide the youtube video link"
      }
    }
  ]
}

