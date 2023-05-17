"use client"

import { Box, ContainerProps, Container, CssBaseline } from "@mui/material"

const MainContainer = ({ children, sx, ...props }: ContainerProps) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <Container sx={{ flex: 1, display: "flex", flexDirection: "column", ...sx }} {...props}>
        {children}
      </Container>
    </Box>
  )
}

export default MainContainer
