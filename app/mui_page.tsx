"use client"

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  createFilterOptions
} from "@mui/material"
import MainContainer from "./main_container"
import NumericFormatInput from "src/components/NumberFormatInput"
import { useState } from "react"
import { car, fuel, payment, refuel } from "@prisma/client"
import { LoadingButton } from "@mui/lab"
import { Send, SwitchAccessShortcutAdd } from "@mui/icons-material"
import { HomeProps } from "./page"
import axios from "axios"
import { signOut } from "next-auth/react"
import { useGlobal } from "src/providers/globalProvider"
import useSWR from "swr"
import { useRouter } from "next/navigation"

const filter = createFilterOptions<car>()

const MuiPage = ({ cars }: HomeProps) => {
  const { data: myCars, mutate } = useSWR<car[]>(
    "api/car",
    (url) => axios.get(url).then((res) => res.data),
    {
      dedupingInterval: 30000,
      fallbackData: cars,
      revalidateIfStale: false
    }
  )
  const { user } = useGlobal()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Partial<refuel & { car: car }>>({})
  const expectedLiters = form.liter_price && form.total_price && form.total_price / form.liter_price
  const expected = form.liter_price && form.liters && form.liter_price * form.liters
  const formatedExpected = expected?.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL"
  })
  const sendAbastecimento = async () => {
    setLoading(true)
    try {
      const { data: abastecimento } = await axios.post("api/refuel", form)
      Boolean(abastecimento?.id) && setForm({})
    } finally {
      alert("Abastecimento realizado com sucesso!")
      setLoading(false)
    }
  }
  return (
    <MainContainer maxWidth="sm" sx={{ justifyContent: "space-evenly", gap: 1, py: 2 }}>
      <Stack>
        <Typography textAlign="center" variant="h1">
          HM
        </Typography>
        <Typography textAlign="center" variant="h2">
          Fuel
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" onClick={() => alert("Em breve")}>
          Relatórios
        </Button>
        <Button
          onClick={(e) => {
            push("/login")
            signOut()
          }}>
          Sair
        </Button>
      </Stack>
      <Stack spacing={2} justifyContent="center">
        {user && <Typography>Olá, {user?.name}</Typography>}
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={myCars || []}
                getOptionLabel={(option) => (option as car)?.name || (option as string)}
                disableClearable
                isOptionEqualToValue={(opt, val) => opt?.name == (val?.name || val)}
                value={form?.car || ""}
                freeSolo
                autoComplete
                onChange={async (_e, car) => {
                  setLoading(true)
                  try {
                    var newCar = typeof car == "string" ? ({ name: car } as car) : car
                    if (!newCar?.id) {
                      newCar = (
                        await axios.post("api/car", {
                          ...newCar,
                          owner_id: user?.id
                        } as car)
                      )?.data
                      await mutate()
                    }
                    setForm({
                      ...form,
                      car: newCar,
                      car_id: newCar?.id
                    })
                  } catch (e) {
                    console.log(e)
                  } finally {
                    setLoading(false)
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)
                  const { inputValue } = params
                  const isExisting = filtered.length > 0
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({ name: inputValue } as car)
                  }
                  return filtered
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option?.id || option?.name}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={loading}
                    required
                    label="Carro"
                    helperText={
                      !Boolean(myCars?.length) && "Comece cadastrando um carro (digite e selecione)"
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Combustível</InputLabel>
                <Select
                  label="Combustível"
                  value={form?.fuel || ""}
                  onChange={(e) => setForm({ ...form, fuel: e?.target?.value as fuel })}>
                  {Object?.values(fuel)?.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Pagamento</InputLabel>
                <Select
                  label="Pagamento"
                  value={form?.payment || ""}
                  onChange={(e) => setForm({ ...form, payment: e?.target?.value as payment })}>
                  {Object?.values(payment)?.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Preço por litro"
                placeholder="R$ 3,89"
                value={form.liter_price || ""}
                onChange={(e: any) => setForm({ ...form, liter_price: e.target.floatValue })}
                inputProps={{ prefix: "R$ ", decimalScale: 3 }}
                InputProps={{
                  inputComponent: NumericFormatInput as any
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Litros"
                placeholder="10 L"
                value={form.liters || ""}
                onChange={(e: any) => setForm({ ...form, liters: e.target.floatValue })}
                inputProps={{ suffix: " L", decimalScale: 3 }}
                InputProps={{
                  inputComponent: NumericFormatInput as any
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Preço total"
                placeholder={formatedExpected || "R$ 20,00"}
                value={form.total_price || ""}
                onChange={(e: any) => setForm({ ...form, total_price: e.target.floatValue })}
                inputProps={{ prefix: "R$ ", decimalScale: 2 }}
                InputProps={{
                  inputComponent: NumericFormatInput as any
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Kilometragem"
                placeholder="Confira no painel"
                value={form.distance || ""}
                onChange={(e: any) => setForm({ ...form, distance: e.target.floatValue })}
                inputProps={{ decimalScale: 0 }}
                InputProps={{
                  inputComponent: NumericFormatInput as any
                }}
                onKeyDown={(e) =>
                  ["Enter", "Tab"].includes(e.key) && !loading && sendAbastecimento()
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ visibility: expected || expectedLiters ? "visible" : "hidden" }}>
            {expectedLiters ? (
              <>
                Litros esperados:{" "}
                <Link onClick={() => setForm({ ...form, liters: expectedLiters })}>
                  {expectedLiters?.toFixed(3)}
                </Link>
              </>
            ) : (
              <>
                Preço esperado:{" "}
                <Link onClick={() => setForm({ ...form, total_price: expected })}>
                  {formatedExpected}
                </Link>
              </>
            )}
          </Typography>
          <LoadingButton
            variant="outlined"
            loading={loading}
            onClick={sendAbastecimento}
            startIcon={<SwitchAccessShortcutAdd />}>
            Abastecer
          </LoadingButton>
        </Stack>
      </Stack>
    </MainContainer>
  )
}

export default MuiPage
