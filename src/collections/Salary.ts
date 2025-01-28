import { CollectionConfig } from "payload";

export const Salary: CollectionConfig = {
  slug: "salary",
  admin: {
    useAsTitle: "member",
  },
  fields: [
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      required: true,
    },
    {
      name: "monthlyProgressReport",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "starCertificate",
      type: "upload",
      relationTo: "media",
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
      name: "PersonAdded",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "A",
              type: "number",
              required: true,
              min: 0
            },
            {
              name: "B",
              type: "number",
              required: true,
              min: 0
            },
            {
              name: "C",
              type: "number",
              required: true,
              min: 0
            }
          ]
        }
      ]
    },
    {
      name: "TotalPersonAdded",
      type: "number",
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            const { A, B, C } = siblingData.PersonAdded;
            return A + B + C;
          }
        ]
      }
    }
  ],
}