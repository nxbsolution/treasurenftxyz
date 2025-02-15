import { CollectionConfig, PayloadRequest } from "payload";

const getMemberData = async (req: PayloadRequest, memberId: number) => {
  const populatedMember = await req.payload.findByID({
    collection: 'members',
    id: memberId,
    select: {
      uid: true,
      depositAddress: true,
    }
  });
  return populatedMember
}

export const Salary: CollectionConfig = {
  slug: "salary",
  admin: {
    useAsTitle: "member",
  },
  hooks: {
    afterChange: [
      async ({ req, doc }) => {
        await req.payload.create({
          collection: "notifications",
          data: {
            assignToMembers: [doc.member],
            linkTo: "SALARY",
            assignToStars: null,
            priority: "HIGH",
            statement: `Your salary application has been ${doc.status.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase())}`,
          }
        });
      }
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
    },
    {
      name: "UID",
      label: "UID",
      type: "text",
      virtual: true,
      admin: {
        readOnly: true,
        components: {
          Cell: "@/components/CopyableCell",
        }
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (data?.member) {
              const { uid } = await getMemberData(req, data.member)
              return uid
            } else {
              return "Not Found"
            }
          }
        ]
      }
    },
    {
      name: "TRC-20",
      label: "TRC-20",
      type: "text",
      virtual: true,
      admin: {
        readOnly: true,
        components: {
          Cell: "@/components/CopyableCell",
        }
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (data?.member) {
              const { depositAddress } = await getMemberData(req, data.member)
              return depositAddress["TRC-20"]
            } else {
              return "Not Found"
            }
          }
        ]
      }
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