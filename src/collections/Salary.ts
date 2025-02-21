import { authenticated } from "@/access/authenticated";
import { manager } from "@/access/manegar";
import { SalaryStatusNotification } from "@/hooks/SalaryStatusNotification";
import { CollectionConfig } from "payload";

export const Salary: CollectionConfig = {
  slug: "salary",
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "member",
    listSearchableFields: ["uid", "realName"],
    components: {
      beforeListTable: [
        {
          path: "@/components/SalaryList",
        }
      ]
    },
    defaultColumns: [
      "realName",
      "status",
      "uid",
      "star",
      "membersA",
      "membersBC",
      "TRC-20",
      "createdAt"
    ],
  },
  access: {
    read: manager,
    create: authenticated,
    update: manager,
    delete: manager,
  },
  hooks: {
    afterChange: [
      SalaryStatusNotification
    ]
  },
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Partial Approved",
          value: "partialApproved",
        },
        {
          label: "Full Approved",
          value: "fullApproved",
        },
        {
          label: "Rejected",
          value: "rejected",
        },
      ],
      admin: {
        components: {
          Cell: "@/components/SalaryStatusCell",
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
      }
    },
    {
      name: "TRC-20",
      label: "TRC-20",
      type: "text",
      admin: {
        readOnly: true,
        components: {
          Cell: "@/components/CopyableCell",
        }
      },
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
      name: "starCertificate",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "membersScreenshot",
      type: "upload",
      relationTo: "media",
    },
  ],
}