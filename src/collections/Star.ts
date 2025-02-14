import { getEligibility } from "@/app/(frontend)/dashboard/(pages)/star-ambassadors/_components/starFromData";
import { CollectionConfig } from "payload";

export const Star: CollectionConfig = {
  slug: "star",
  hooks: {
    // beforeValidate: [
    //   ({ data }) => {
    //     const eligibility = getEligibility(data?.A, data?.BC)
    //     if (eligibility === "not eligible") {
    //       return null;
    //     }
    //     else {
    //       return data
    //     }
    //   }
    // ],
  },
  fields: [
    {
      name: "member",
      type: "relationship",
      unique: true,
      relationTo: "members",
      required: true,
    },
    {
      name: "A",
      label: "Team A",
      type: "number",
      required: true,
    },
    {
      name: "BC",
      label: "Team B + C",
      type: "number",
      required: true,
    },
    {
      name: "totalReport",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "oldStarCard",
      type: "upload",
      relationTo: "media",
    },
  ],
}