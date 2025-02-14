import Header from "../_components/AuthHeader"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <Header />
      {children}
    </>
  )
}
