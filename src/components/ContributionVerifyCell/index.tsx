"use client"

import { useRouter, usePathname } from "next/navigation"

export default function ContributionVerifyCell({ cellData, rowData, link }) {

  const router = useRouter();
  const pathname = usePathname();

  const backgroundColor = {
    PENDING: {
      backgroundColor: "orange"
    },
    APPROVED: {
      backgroundColor: "green"
    },
    REJECTED: {
      backgroundColor: "red"
    }
  }

  const generalStyle = {
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
        style={{ ...generalStyle, ...backgroundColor[cellData], ...link && linkStyle }}
        onClick={() => {
          link && router.push(`${pathname}/${rowData.id}`)
        }}
      >
        {cellData}
      </span>
  )
};