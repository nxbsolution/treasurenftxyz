import { z } from "zod"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf']

export const getEligibility = (A: number, BC: number) => {
  if (A >= 80 && BC >= 2500) return { star: "6star", message: "eligible for six-star ⭐⭐⭐⭐⭐⭐ ambassador" }
  if (A >= 60 && BC >= 1500 && BC <= 2500) return { star: "5star", message: "eligible for five-star ⭐⭐⭐⭐⭐ ambassador" }
  if (A >= 50 && BC >= 1000 && BC <= 1500) return { star: "4star", message: "eligible for four-star ⭐⭐⭐⭐ ambassador" }
  if (A >= 30 && BC >= 500 && BC <= 999) return { star: "3star", message: "eligible for three-star ⭐⭐⭐ ambassador" }
  if (A >= 25 && BC >= 150 && BC <= 499) return { star: "2star", message: "eligible for two-star ⭐⭐ ambassador" }
  if (A >= 15 && BC >= 60 && BC <= 149) return { star: "1star", message: "eligible for one-star ⭐ ambassador" }
  return { star: "0star", message: "Not eligible" }
}

export const newIssueSchema = z.object({
  A: z.string()
    .transform((val) => parseInt(val))
    .pipe(
      z.number()
        .int("Only whole numbers are allowed")
        .nonnegative("Must be a positive number")
        .min(0, "A must be greater than 0")
    ),

  BC: z.string()
    .transform((val) => parseInt(val))
    .pipe(
      z.number()
        .int("Only whole numbers are allowed")
        .nonnegative("Must be a positive number")
        .min(0, "B must be greater than 0")
    ),

  totalReport: z.custom<File>((value) => value instanceof File, {
    message: 'Please upload your total report.',
  })
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 2MB. Please compress your image or choose a smaller file.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
    )
    .refine((file) => file.size > 0, 'Report is required'),
})

export const existingIssueSchema = newIssueSchema.extend({
  oldStarCertificate: z.custom<File>((value) => value instanceof File, {
    message: 'Please upload your old star certificate.',
  })
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 2MB. Please compress your image or choose a smaller file.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
    )
    .refine((file) => file.size > 0, 'old star certificate is required'),
})

export const newIssueFields = [
  {
    title: "Star Ambassador",
    fields: [
      {
        name: "A",
        label: "Team A",
        type: "number",
        required: true,
        description: "Enter your A team"
      },
      {
        name: "BC",
        label: "Team B + C",
        type: "number",
        required: true,
        description: "Enter your B + C team"
      },
      {
        name: "totalReport",
        label: "Total Report",
        type: "file",
        required: true,
        description: "Upload your total report"
      }
    ]
  },
]

export const existingIssueFields = [
  {
    title: "Star Ambassador",
    fields: [
      {
        name: "A",
        label: "Team A",
        type: "number",
        required: true,
        description: "Enter your A team"
      },
      {
        name: "BC",
        label: "Team B + C",
        type: "number",
        required: true,
        description: "Enter your B + C team"
      },
      {
        name: "totalReport",
        label: "Total Report",
        type: "file",
        required: true,
        description: "Upload your total report"
      },
      {
        name: "oldStarCertificate",
        label: "Old Star Certificate",
        type: "file",
        required: true,
        description: "Upload your old star certificate"
      }
    ]
  },
]