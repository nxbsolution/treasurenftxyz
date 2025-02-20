import { admin } from "@/access/admin";
import { authenticated } from "@/access/authenticated";
import { CollectionConfig } from "payload";

export const Star: CollectionConfig = {
  slug: "star-ambassadors",
  access: {
    read: admin,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "verify",
      type: "select",
      defaultValue: "PENDING",
      options: [
        "PENDING",
        "APPROVED",
        "REJECTED"
      ],
      admin: {
        components: {
          Cell: "@/components/ContributionVerifyCell"
        }
      }
    },
    {
      name: "member",
      type: "relationship",
      unique: true,
      relationTo: "members",
      required: true,
    },
    {
      name: "membersA",
      type: "number",
      required: true,
      admin: {
        description: "Number of members added in A group.",
      }
    },
    {
      name: "membersBC",
      label: "Members B + C",
      type: "number",
      required: true,
      admin: {
        description: "Number of members added in B + C group.",
      }
    },
    {
      name: "starApplyingFor",
      type: "select",
      hasMany: false,
      required: true,
      options: [
        "1star", "2star", "3star", "4star", "5star", "6star"
      ]
    },
    {
      name: "membersScreenshot",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "latestStarCertificate",
      type: "upload",
      relationTo: "media",
    },
  ],
}