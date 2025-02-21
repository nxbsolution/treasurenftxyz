import { Salary } from "@/payload-types";

export const SalaryStatusNotification = async ({ req, doc }: { doc: Salary, req: any }) => {

  const salaryMessage = await req.payload.findGlobal({
    slug: "salary-notification-messages",
  })

  await req.payload.create({
    collection: "notifications",
    data: {
      assignToUid: [doc.member],
      linkTo: "SALARY",
      assignToStars: null,
      priority: "HIGH",
      statement: salaryMessage[doc.status as NonNullable<Salary["status"]>],
    }
  });
}
