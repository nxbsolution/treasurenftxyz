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
  membersA: z.string()
    .transform((val) => parseInt(val))
    .pipe(
      z.number()
        .int("Only whole numbers are allowed")
        .nonnegative("Must be a positive number")
        .min(0, "Team A must be greater than 0")
    ),

  membersBC: z.string()
    .transform((val) => parseInt(val))
    .pipe(
      z.number()
        .int("Only whole numbers are allowed")
        .nonnegative("Must be a positive number")
        .min(0, "Team BC must be greater than 0")
    ),
  star: z.string().min(1, 'Please select a star.'),
  membersScreenshot: z.custom<File>((value) => value instanceof File, {
    message: 'Please upload your report.',
  })
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 2MB. Please compress your image or choose a smaller file.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
    )
    .refine((file) => file.size > 0, 'Members Screenshot is required'),
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
