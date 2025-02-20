import { admin } from "@/access/admin";
import { authenticated } from "@/access/authenticated";
import { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "uid",
    listSearchableFields: ["uid", "realName"],
  },
  access: {
    read: admin,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Member Details",
          fields: [
            {
              name: "user",
              type: "relationship",
              relationTo: "users",
              required: true,
            },
            // {
            //   name: "allowSalaryWithoutContribution",
            //   type: "checkbox",
            //   defaultValue: false,
            //   admin: {
            //     description: "If checked, this member can apply for salary without contribution.",
            //   }
            // },
            {
              name: "uid",
              label: "UID",
              type: "text",
              required: true,
              unique: true,
              index: true,
              admin: {
                readOnly: true,
                components: {
                  Cell: "@/components/CopyableCell",
                }
              },
            },
            {
              name: "nft_username",
              label: "NFT User Name",
              type: "text",
              required: true,
            },
            {
              name: "country",
              type: "select",
              options: [
                "india", "pakistan",
                "bangladesh", "rusia",
                "italy", "australia",
                "dubai", "saudiArabia",
                "afghanistan", "others"
              ],
              required: true,
            },
            {
              name: "level",
              type: "select",
              options: [
                "level1", "level2", "level3",
                "level4", "level5", "level6"
              ],
              required: true,
            },
            {
              name: "uplineName",
              type: "text",
              required: true,
            },
            {
              name: "uplineUid",
              type: "text",
              required: true,
            },
            {
              name: "realName",
              type: "text",
              required: true,
            },
            {
              name: "mobile",
              type: "text",
            },
            {
              name: "city",
              type: "text",
            },
            {
              name: "depositAddress",
              label: "USDT Deposit Address",
              type: "group",
              fields: [
                {
                  name: "TRC-20",
                  type: "text",
                  required: true,
                },
                {
                  name: "BEP-20",
                  type: "text",
                  required: true,
                }
              ]
            },
            {
              name: "star",
              type: "select",
              options: [
                "star1", "star2", "star3",
                "star4", "star5", "star6"
              ],
            }
          ],
        },
        {
          label: "Contribution History",
          fields: [
            {
              name: "contributions",
              type: "join",
              collection: "contributions",
              on: "member",
            }
          ]
        }
      ]
    }
  ]
}