import "../old_app_folder/(frontend)/globals.css"

export const metadata = {
  title: 'Online Acedemy',
  description: 'An online learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
