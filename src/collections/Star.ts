import { CollectionConfig } from "payload";

export const Star: CollectionConfig = {
  slug: "star",
  fields: [
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      required: true,
    },
    {
      name: "totalReport",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "oldStarCard",
      type: "upload",
      relationTo: "media",
    },
  ],
}