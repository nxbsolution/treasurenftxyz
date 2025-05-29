import { z } from "zod"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf']

export const applySalarySchema = z.object({
  uid: z.string().optional(),
  realName: z.string().optional(),
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
  "TRC-20": z.string(),
  star: z.string().min(1, 'Please select a star.'),
  salaryFor: z.string().min(1, 'Please select salary month'),
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

  starCertificate: z.custom<File>((value) => value instanceof File, {
    message: 'Please upload your report.',
  })
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 2MB. Please compress your image or choose a smaller file.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_DOCUMENT_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf formats are supported.',
    )
    .refine((file) => file.size > 0, 'Report is required'),
})

// export const applySalaryFields = [
//   {
//     title: "Member Detail",
//     fields: [
//       {
//         name: "uid",
//         label: "UID",
//         type: "text",
//         required: false,
//         readonly: true,
//         description: "your UID"
//       },
//       {
//         name: "nft_username",
//         label: "NFT Username",
//         type: "text",
//         required: false,
//         readonly: true,
//         description: "Your NFT Username"
//       },
//       {
//         name: "TRC-20",
//         label: "Your TRC-20 Deposit address",
//         type: "text",
//         required: true,
//         description: "Enter your TRC-20 Deposite Address"
//       }
//     ]
//   },
//   {
//     title: "Growth Rate",
//     fields: [
//       {
//         name: "star",
//         label: "Select Your Star",
//         type: "text",
//       },
//       {
//         name: "A",
//         label: "Team A",
//         type: "number",
//         required: true,
//         description: "Enter your direct A members from the 1st to the 30th of this month"
//       },
//       {
//         name: "BC",
//         label: "Team B + C",
//         type: "number",
//         required: true,
//         description: "Enter your direct B + C members from the 1st to the 30th of this month"
//       },
//     ]
//   },
//   {
//     title: "Upload",
//     fields: [
//       {
//         name: "report",
//         label: "Total Report",
//         type: "file",
//         required: true,
//         description: "Upload your total report"
//       },
//       {
//         name: "starCertificate",
//         label: "Upload star Certificate",
//         type: "file",
//         required: true,
//         description: "Upload your star Certificate",
//       }
//     ]
//   }
// ]
