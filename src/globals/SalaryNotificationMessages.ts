import { authenticated } from "@/access/authenticated";
import { GlobalConfig } from "payload";

export const SalaryNotificationMessages: GlobalConfig = {
  slug: "salary-notification-messages",
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "pending",
      label: "Pending Notification",
      type: "text",
      required: true,
      defaultValue: "Your salary is pending approval.",
      admin: {
        description: "This message will be sent. When the salary is pending",
      }
    },
    {
      name: "partialApproved",
      label: "Partial Approved Notification",
      type: "text",
      required: true,
      defaultValue: "Your salary is partially approved.",
      admin: {
        description: "This message will be sent. When the salary is partially approved",
      }
    },
    {
      name: "fullApproved",
      label: "Full Approved Notification",
      type: "text",
      required: true,
      defaultValue: "Your salary is fully approved.",
      admin: {
        description: "This message will be sent. When the salary is fully approved",
      }
    },
    {
      name: "rejected",
      label: "Rejected Notification",
      type: "text",
      required: true,
      defaultValue: "Your salary is rejected.",
      admin: {
        description: "This message will be sent. When the salary is rejected",
      }
    }
  ]
}