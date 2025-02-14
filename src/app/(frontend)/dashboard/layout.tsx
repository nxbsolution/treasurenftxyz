import Header from "../_components/AuthHeader"
import { redirect } from "next/navigation"
import { getUser } from "@/provider/Auth/payloadFunctions"
import ClientLayout from "./ClientLayout"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { user, member } = await getUser()

  if (!user) {
    redirect('/login')
  }

  if (!member) {
    return <ClientLayout user={user} />
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
