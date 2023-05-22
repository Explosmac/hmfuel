"use client"

import { Link, Stack, TextField, Typography } from "@mui/material"
import MainContainer from "../main_container"
import { useState } from "react"
import { LoadingButton } from "@mui/lab"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "src/lib/firebase"
import axios from "axios"
import { signIn } from "next-auth/react"
import NextLink from "next/link"

const RegisterMuiPage = () => {
  const { push } = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  return (
    <MainContainer maxWidth="xs" sx={{ justifyContent: "space-evenly" }}>
      <Stack spacing={1}>
        <TextField
          label="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          Já possui uma conta?{" "}
          <Link href="/login" component={NextLink}>
            Clique aqui
          </Link>{" "}
          e entre
        </Typography>
        <LoadingButton
          onClick={async () => {
            try {
              const { user } = await createUserWithEmailAndPassword(
                auth,
                form?.email,
                form?.password
              )
              await axios.post("api/user", {
                name: form?.name,
                email: user?.email,
                id: user?.uid
              })
              await signIn("credentials", {
                redirect: false,
                email: user?.email,
                password: form?.password
              })
              push("/")
            } catch (e) {
              console.log(e)
            }
          }}>
          Cadastrar
        </LoadingButton>
      </Stack>
    </MainContainer>
  )
}

export default RegisterMuiPage
