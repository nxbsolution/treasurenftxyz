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
    useAsTitle: "realName",
    defaultColumns: ["verify", "realName", "mobile", "cityName", "transactionId", "star", "amount", "createdAt"]
  },
  defaultSort: "-createdAt",
  fields: [
    {
      name: "uploadStarCertificate",
      type: "upload",
      relationTo: "media",
      // required: true,
    },
    {
      name: "realName",
      type: "text",
      required: true,
    },
    {
      name: "nft_username",
      label: "NFT Username",
      type: "text",
      required: true,
    },
    {
      name: "uid",
      label: "UID",
      type: "text",
      required: true,
    },
    {
      name: "mobile",
      type: "text",
      required: true,
    },
    {
      name: "cityName",
      type: "text",
      required: true,
    },
    {
      name: "uplineName",
      type: "text",
      required: true,
    },
    {
      name: "star",
      label: "Select Your Star",
      type: "select",
      hasMany: false,
      options: [
        "1star", "2star", "3star", "4star", "5star", "6star"
      ]
    },
    {
      name: "amount",
      type: "number",
      min: 0,
      required: true
    },
    {
      name: "depositAddress",
      label: "Select USDT Deposit Address",
      type: "radio",
      required: true,
      options: [
        {
          label: "TRC-20",
          value: "TRC-20"
        },
        {
          label: "BEP-20",
          value: "BEP-20"
        }
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
      // required: true,
    },
    {
      name: "verify",
      type: "select",
      defaultValue: "PENDING",
      required: true,
      options: [
        "PENDING",
        "APPROVED",
        "REJECTED"
      ]
    }
  ],
}