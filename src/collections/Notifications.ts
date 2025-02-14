import { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: {
    useAsTitle: "statement",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "statement",
      type: "text",
      required: true,
    },
    {
      name: "assignToStars",
      type: "select",
      options: [
        {
          label: "star 1",
          value: "1star",
        },
        {
          label: "star 2",
          value: "2star",
        },
        {
          label: "star 3",
          value: "3star",
        },
        {
          label: "star 4",
          value: "4star",
        },
        {
          label: "star 5",
          value: "5star",
        },
        {
          label: "star 6",
          value: "6star",
        }
      ],
      hasMany: true,
      defaultValue: ["1star", "2star", "3star", "4star", "5star", "6star"],
    },
    {
      name: "assignToMembers",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
    },
    {
      name: "linkTo",
      type: "select",
      options: [
        {
          label: "Salary",
          value: "SALARY",
        },
        {
          label: "Contribution",
          value: "CONTRIBUTION",
        }
      ]
    },
    {
      name: "assignToDefaulters",
      type: "select",
      options: ["CONTRIBUTION"],
    },
    {
      name: "priority",
      type: "select",
      options: ["HIGH", "NORMAL"],
      defaultValue: "NORMAL",
    },
    {
      name: "display",
      type: "checkbox",
      defaultValue: true,
    }
  ],
};