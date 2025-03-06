import { admin } from "@/access/admin";
import { authenticated } from "@/access/authenticated";
import { GlobalConfig } from "payload";

export const Meetings: GlobalConfig = {
  slug: "meetings",
  access: {
    read: admin,
    update: authenticated,
  },
  fields: [
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Start Meeting",
          value: "start",
        },
        {
          label: "End Meeting",
          value: "end",
        },
        {
          label: "Hold Meeting",
          value: "hold",
        }
      ],
      defaultValue: "hold",
      required: true,
      admin: {
        position: "sidebar",
      }
    },
    {
      name: "link",
      label: "Meeting Link",
      type: "text",
      required: true,
    },
    {
      name: "agenda",
      type: "textarea",
      required: true,
    },
    {
      name: "assignToAll",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Select this if you want to assign to all members",
      }
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
      admin: {
        condition: (data) => data.assignToAll ? false : true,
        description: "Dont select assign to uid if you want to assign to specific members",
      }
    },
    {
      name: "assignToUid",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
      maxDepth: 0,
      admin: {
        condition: (data) => data.assignToAll ? false : true,
        description: "Dont select assign to stars if you want to assign to specific members",
      }
    },
    {
      name: "announcement",
      type: "textarea",
      required: true,
      admin: {
        description: "This message will be shown when meeting is not scheduled or not assigned to a member/star",
      }
    }
  ],
};