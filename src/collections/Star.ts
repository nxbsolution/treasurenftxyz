import { admin } from "@/access/admin";
import { authenticated } from "@/access/authenticated";
import { getEligibility } from "@/app/(frontend)/dashboard/(pages)/star-ambassadors/_components/starFromData";
import { CollectionConfig } from "payload";

export const Star: CollectionConfig = {
  slug: "star",
  access: {
    read: admin,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
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