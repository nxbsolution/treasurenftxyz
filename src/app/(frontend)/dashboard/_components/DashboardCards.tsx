"use client"
import Link from "next/link"
import { useAuth } from "@/provider/Auth"
import { dashboardLinks } from "../../_components/DashboardLinks"

export default function DashboardCards() {

  const { user } = useAuth()

  return (
    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 max-sm:gap-4">
      {
        dashboardLinks.map((link, index) => (
          <Link key={index} href={link.href} aria-label={link.label}>
            <div className="bg-card text-center pt-6 h-20 w-full font-bold text-lg shadow-lg rounded-lg border border-primary hover:scale-110 transition-all hover:shadow-primary">
              {link.label}
            </div>
          </Link>
        ))
      }
    </div>
  )
}
