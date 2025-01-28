import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";

export const Contributions: CollectionConfig = {
  slug: 'contributions',
  access: {
    read: authenticated,
    update: authenticated,
    delete: authenticated,
    create: () => true,
  },
  admin: {
    useAsTitle: "member",
  },
  defaultSort: "-createdAt",
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
      relationTo: "members",
      required: true,
    },
    {
      name: "nft_username",
      label: "NFT Username",
      type: "text",
      required: true,
    },
    {
      name: "star",
      label: "Select Your Star",
      type: "select",
      hasMany: false,
      required: true,
      options: [
        "1star", "2star", "3star", "4star", "5star", "6star"
      ]
    },
    {
      name: "transactionId",
      type: "text",
      required: true,
    },
    {
      name: "screenShot",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "uploadStarCertificate",
      type: "upload",
      relationTo: "media",
      required: true,
    }
  ],
}