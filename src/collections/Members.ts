import { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "realName",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "country",
      type: "select",
      options: [
        "india",
        "pakistan",
        "uae",
        "bangladesh",
        "others"
      ],
      required: true,
    },
    {
      name: "realName",
      type: "text",
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
      name: "uid",
      label: "UID",
      type: "text",
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
      // required: true,
    }
  ],
}