import { getPayload } from "payload";
import config from "@payload-config"
import MeetingError from "./components/MeetingError";
import MeetingCard from "./components/MeetingCard";
import { getUser } from "@/provider/Auth/payloadFunctions";
import MeetingAnnouncement from "./components/MeetingAnnouncement";

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const meeting = await payload.findGlobal({
      slug: "meetings",
      depth: 0,
    })

    if (meeting.status === "end") {
      return <MeetingAnnouncement announcement={meeting.announcement} />
    }

    if (meeting.assignToAll) {
      return <MeetingCard meeting={meeting} />
    }

    const { member } = await getUser()

    if (member?.star) {
      const number = member.star.charAt(4) as "1" | "2" | "3" | "4" | "5" | "6";
      const currentStar = `${number}star` as const;
      if (meeting.assignToStars?.includes(currentStar)) {
        return <MeetingCard meeting={meeting} />
      }
    }

    if (meeting.assignToUid?.includes(member?.id || 0)) {
      return <MeetingCard meeting={meeting} />
    }

    return <MeetingAnnouncement announcement={meeting.announcement} />

  } catch (_) {
    return <MeetingError />
  }
}