"use client"

import { ContainerProps, ThemeProvider, createTheme } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import { GlobalProvider } from "src/providers/globalProvider"

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
})

const ProviderWrap = ({ children }: ContainerProps) => {
  return (
    <SessionProvider>
      <GlobalProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GlobalProvider>
    </SessionProvider>
  )
}

export default ProviderWrap
