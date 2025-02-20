import { authenticated } from "@/access/authenticated";
import { admin } from "@/access/admin";
import type { CollectionConfig } from "payload";

export const Contributions: CollectionConfig = {
  slug: 'contributions',
  access: {
    read: admin,
    update: admin,
    delete: admin,
    create: authenticated,
  },
  admin: {
    useAsTitle: "realName",
    listSearchableFields: ["uid", "realName"],
    components: {
      beforeListTable: [
        {
          path: "@/components/ContributionList",
        }
      ]
    }
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
      admin: {
        readOnly: true,
        disableListColumn: true,
      }
    },
    {
      name: "uid",
      type: "text",
      index: true,
      admin: {
        readOnly: true,
        components: {
          Cell: "@/components/CopyableCell",
        }
      },
    },
    {
      name: "realName",
      type: "text",
      index: true,
      admin: {
        readOnly: true,
        // components: {
        //   Cell: "@/components/CopyableCell",
        // }
      }
    },
    {
      name: "depositAddress",
      label: "Deposit Address",
      type: "radio",
      options: [
        "TRC-20",
        "BEP-20",
      ],
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
      admin: {
        readOnly: true,
      }
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