"use client"

import { Salary } from "@/payload-types";
import { useRouter, usePathname } from "next/navigation"

type cellData = Salary["status"]

export default function SalaryStatusCell({ cellData, rowData, link }: { cellData: cellData, rowData: any, link?: boolean }) {

  const router = useRouter();
  const pathname = usePathname();

  const backgroundColor = {
    pending: {
      backgroundColor: "#F39C12",
    },
    partialApproved: {
      backgroundColor: "#54A0FF",
    },
    fullApproved: {
      backgroundColor: "#03c04a"
    },
    rejected: {
      backgroundColor: "#E74C3C"
    }
  }

  const generalStyle = {
    color: "white",
    padding: "4px",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "inline-block",
  }

  const linkStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  }

  return (
    <span
      style={{ ...generalStyle, ...backgroundColor[cellData || "pending"], ...link && linkStyle }}
      onClick={() => {
        if (link) {
          router.push(`${pathname}/${rowData.id}`)
        }
      }}
    >
      {cellData?.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
    </span>
  )
};