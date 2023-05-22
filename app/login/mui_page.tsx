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
  const [loading, setLoading] = useState(false)
  const loginAuth = async () => {
    setLoading(true)
    try {
      if (!form?.email || !form?.password) {
        throw new Error("Preencha todos os campos")
      }
      const res = await signIn("credentials", {
        redirect: false,
        ...form
      })
      res?.error ? alert(res?.error) : push(res?.url || "")
    } catch (e: any) {
      alert(e?.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <MainContainer maxWidth="xs" sx={{ justifyContent: "space-evenly" }}>
      <Stack spacing={1}>
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onKeyDown={(e) => e.key == "Enter" && !loading && loginAuth()}
        />
        <TextField
          label="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={(e) => e.key == "Enter" && !loading && loginAuth()}
        />
        <Typography>
          Não possui uma conta?{" "}
          <Link href="/register" component={NextLink}>
            Clique aqui
          </Link>{" "}
          e cadastre-se
        </Typography>
        <LoadingButton onClick={loginAuth} loading={loading}>
          Entrar
        </LoadingButton>
      </Stack>
    </MainContainer>
  )
}

export default LoginMuiPage
