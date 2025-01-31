import { z } from "zod"

export const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  uid: z.string().min(2, {
    message: "UID must be at least 2 characters.",
  }),
  nft_username: z.string().min(3, {
    message: "NFT Username must be at least 3 characters.",
  }),
  level: z.enum(["level1", "level2", "level3", "level4", "level5", "level6"], {
    required_error: "Please select a level.",
  }),
  realName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  uplineName: z.string().min(3, {
    message: "Upline Name must be at least 3 characters.",
  }),
  uplineUid: z.string().min(3, {
    message: "uli must be at least 3 characters.",
  }),
  city: z.string().min(3, {
    message: "City Name must be at least 3 characters.",
  }),
  country: z.enum(["india", "pakistan", "bangladesh", "rusia", "italy", "australia", "dubai", "saudiArabia", "afghanistan", "others"], {
    required_error: "Please select a country.",
  }),
  mobile: z.string().min(11, {
    message: "Mobile Number must be at least 11 characters.",
  }),
  "TRC-20": z.string().min(3, {
    message: "Deposit Address must be at least 3 characters.",
  }),
  "BEP-20": z.string().min(3, {
    message: "Deposit Address must be at least 3 characters.",
  }),
  star: z.enum(["star1", "star2", "star3", "star4", "star5", "star6"]).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"], // path of error
})

export const cardFields = [
  {
    title: "Account Security",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "abc123@gmail.com",
        description: "Enter your active email address."
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Enter a strong password",
        description: "Password must be at least 6 characters",
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
        placeholder: "Re-enter your password",
        description: "Password must be at least 6 characters",
      }
    ]
  },
  {
    title: "Location Details",
    fields: [
      {
        name: "country",
        label: "Select Your Country:",
        type: "select",
        required: true,
        placeholder: "Select your country",
        description: "Choose the country where you currently reside",
        options: [
          {
            id: "1",
            value: "india",
            label: "India"
          },
          {
            id: "2",
            value: "pakistan",
            label: "Pakistan"
          },
          {
            id: "3",
            value: "bangladesh",
            label: "Bangladesh"
          },
          {
            id: "4",
            value: "rusia",
            label: "Rusia"
          },
          {
            id: "5",
            value: "italy",
            label: "Italy"
          },
          {
            id: "6",
            value: "australia",
            label: "Australia"
          },
          {
            id: "7",
            value: "dubai",
            label: "Dubai"
          },
          {
            id: "8",
            value: "saudiArabia",
            label: "Saudi Arabia"
          },
          {
            id: "9",
            value: "afghanistan",
            label: "Afghanistan"
          },
          {
            id: "10",
            value: "others",
            label: "Others"
          }
        ]
      },
    ]
  },
  {
    title: "NFT Details",
    fields: [
      {
        name: "uid",
        label: "Your UID:",
        type: "text",
        required: true,
        placeholder: "Enter your Treasure NFT UID",
        description: "Your UID given by Treasure NFT"
      },
      {
        name: "nft_username",
        label: "NFT Username:",
        type: "text",
        required: true,
        placeholder: "Enter your NFT username",
        description: "Your Username given by Treasure NFT"
      },
      {
        name: "level",
        label: "Level:",
        type: "select",
        required: true,
        placeholder: "Select your level",
        description: "Select your current NFT level",
        options: [
          {
            id: "1",
            value: "level1",
            label: "Level 1"
          },
          {
            id: "2",
            value: "level2",
            label: "Level 2"
          },
          {
            id: "3",
            value: "level3",
            label: "Level 3"
          },
          {
            id: "4",
            value: "level4",
            label: "Level 4"
          },
          {
            id: "5",
            value: "level5",
            label: "Level 5"
          },
          {
            id: "6",
            value: "level6",
            label: "Level 6"
          }
        ]
      },
    ]
  },
  {
    title: "Upline Information",
    fields: [
      {
        name: "realName",
        label: "Legal Name:",
        type: "text",
        required: true,
        placeholder: "Enter your full legal name",
        description: "Name as per official documents (i.e. passport, Aadhar, CNIC, etc.)"
      },
      {
        name: "uplineName",
        label: "Upline Name:",
        type: "text",
        required: true,
        placeholder: "Enter your upline name",
        description: "Username of the person who referred you to our platform"
      },
      {
        name: "uplineUid",
        label: "Upline UID:",
        type: "text",
        required: true,
        placeholder: "Enter referrer's UID",
        description: "Unique identifier of your referrer"
      },
    ]
  },
  {
    title: "Contact & Wallet Details",
    fields: [
      {
        name: "mobile",
        label: "Mobile Number:",
        type: "text",
        required: true,
        placeholder: "Enter with country code",
        description: "Include country code (e.g., +91 for India)"
      },
      {
        name: "city",
        label: "City:",
        type: "text",
        placeholder: "Enter your current city",
        required: true,
        description: "City where you currently reside"
      },
      {
        name: "TRC-20",
        label: "USDT Deposit Address (TRC-20)",
        type: "text",
        required: true,
        placeholder: "Enter TRC-20 USDT address",
        description: "Your USDT wallet address on TRON network"
      },
      {
        name: "BEP-20",
        label: "USDT Deposit Address (BEP-20)",
        type: "text",
        required: true,
        placeholder: "Enter BEP-20 USDT address",
        description: "Your USDT wallet address on Binance Smart Chain"
      },
      {
        name: "star",
        label: "Star Ambassador",
        type: "select",
        placeholder: "Select your Star",
        description: "Select your current star in the platform",
        options: [
          {
            id: "1",
            value: "star1",
            label: "Star 1"
          },
          {
            id: "2",
            value: "star2",
            label: "Star 2"
          },
          {
            id: "3",
            value: "star3",
            label: "Star 3"
          },
          {
            id: "4",
            value: "star4",
            label: "Star 4"
          },
          {
            id: "5",
            value: "star5",
            label: "Star 5"
          },
          {
            id: "6",
            value: "star6",
            label: "Star 6"
          }
        ]
      }
    ]
  }
]