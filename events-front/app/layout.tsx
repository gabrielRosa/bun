import PrimeProvider from "@/components/provider/PrimeProvider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PrimeProvider>
          {children}
        </PrimeProvider>
      </body>
    </html>
  )
}
