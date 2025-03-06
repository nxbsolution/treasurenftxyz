import { getPayload } from "payload";
import config from "@payload-config";
import HelpSupport from "./components/HelpSupport";
import { getUser } from "@/provider/Auth/payloadFunctions";

export default async function HelpSupportPage() {

  try {

    const { member } = await getUser()
    if (!member) return <div>You are not logged in</div>

    const payload = await getPayload({ config })
    const queries = await payload.find({
      collection: "queries",
      limit: 25,
      depth: 0,
      where: {
        member: {
          equals: member.id
        }
      },
      sort: "-updatedAt",
    })

    return <HelpSupport queries={queries.docs} memberId={member.id} />
  } catch (_) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-3">We&#39;ll be right back!</h2>
        <p className="text-gray-600">Our support system is taking a quick break. Please refresh the page or try again in a moment.</p>
      </div>
    );
  }
}