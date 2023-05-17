import { IMaskInput } from "react-imask"
import { TextFieldProps } from "@mui/material"
import { forwardRef } from "react"

const MaskedInput = forwardRef<HTMLElement, TextFieldProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value: string) =>
        onChange?.({
          target: {
            // @ts-ignore
            name: props.name,
            value,
            floatValue: Number(value.replace(/[^0-9.,-]+/g, ""))
          }
        })
      }
      overwrite
    />
  )
})

export default MaskedInput
