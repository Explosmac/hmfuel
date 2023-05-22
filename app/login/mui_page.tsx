"use client"

import { Link, Stack, TextField, Typography } from "@mui/material"
import MainContainer from "../main_container"
import { useState } from "react"
import { LoadingButton } from "@mui/lab"
import { signIn } from "next-auth/react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"

const LoginMuiPage = () => {
  const { push } = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  return (
    <MainContainer maxWidth="xs" sx={{ justifyContent: "space-evenly" }}>
      <Stack spacing={1}>
        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Typography>
          Não possui uma conta?{" "}
          <Link href="/register" component={NextLink}>
            Clique aqui
          </Link>{" "}
          e cadastre-se
        </Typography>
        <LoadingButton
          onClick={() =>
            signIn("credentials", {
              redirect: false,
              ...form
            }).then((res) => (res?.error ? alert(res?.error) : push(res?.url || "")))
          }>
          Entrar
        </LoadingButton>
      </Stack>
    </MainContainer>
  )
}

export default LoginMuiPage
