import { TextFieldProps } from "@mui/material"
import { forwardRef } from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

const NumericFormatInput = forwardRef<NumericFormatProps, TextFieldProps>(
  function NumericFormatInput(props, ref) {
    const { onChange, ...other } = props

    return (
      // @ts-ignore
      <NumericFormat
        {...other}
        getInputRef={ref}
        // isAllowed={({ floatValue }) => (floatValue ? floatValue < 1000 : true)}
        onValueChange={(values) => {
          onChange?.({
            target: {
              // @ts-ignore
              name: props.name,
              ...values
            }
          })
        }}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
      />
    )
  }
)

export default NumericFormatInput
