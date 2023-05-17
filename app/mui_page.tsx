"use client"

import { Stack, TextField, Typography } from "@mui/material"
import MainContainer from "./main_container"
import NumericFormatInput from "src/components/NumberFormatInput"
import { useState } from "react"
import { refuel } from "@prisma/client"

const MuiPage = () => {
  const [form, setForm] = useState<Partial<refuel>>({})
  const expected = form.liter_price && form.liters && form.liter_price * form.liters
  const formatedExpected = expected?.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL"
  })
  return (
    <MainContainer maxWidth="sm" sx={{ justifyContent: "space-evenly" }}>
      <Stack>
        <Typography textAlign="center" variant="h1">
          HM
        </Typography>
        <Typography textAlign="center" variant="h2">
          Fuel
        </Typography>
      </Stack>
      <Stack spacing={2} justifyContent="center">
        <TextField
          label="Preço por litro"
          placeholder="R$ 3,89"
          value={form.liter_price || ""}
          onChange={(e: any) => setForm({ ...form, liter_price: e.target.floatValue })}
          inputProps={{ prefix: "R$ ", decimalScale: 3 }}
          InputProps={{
            inputComponent: NumericFormatInput as any
          }}
        />
        <TextField
          label="Litros"
          placeholder="10 L"
          value={form.liters || ""}
          onChange={(e: any) => setForm({ ...form, liters: e.target.floatValue })}
          inputProps={{ suffix: " L", decimalScale: 3 }}
          InputProps={{
            inputComponent: NumericFormatInput as any
          }}
        />
        <TextField
          label="Preço total"
          placeholder={formatedExpected || "R$ 20,00"}
          value={form.total_price || ""}
          onChange={(e: any) => setForm({ ...form, total_price: e.target.floatValue })}
          inputProps={{ prefix: "R$ ", decimalScale: 2 }}
          InputProps={{
            inputComponent: NumericFormatInput as any
          }}
        />
        <Typography sx={{ visibility: expected ? "visible" : "hidden" }}>
          Preço esperado: {formatedExpected}
        </Typography>
      </Stack>
    </MainContainer>
  )
}

export default MuiPage
