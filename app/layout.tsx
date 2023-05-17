export const metadata = {
  title: "HM Fuel",
  description: "O app de controle abastecimento",
  icons: {
    icon: "fuel-station1.png"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
