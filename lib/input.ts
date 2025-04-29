import { FormEventHandler, useEffect, useMemo, useState } from 'react'
import { parseUnits } from 'viem'
import { useConnectedAccount } from './wagmi'
import { shortifyDecimals } from './numbers'

const isComma = (n: any) => n === '.' || n === ','
const commify = (n: any) => (n || '').replace(',', '.')

export const validateInput = (value: string | number = '') => {
  const isAlpha = /[a-z\s]/gi.test(`${value}`)
  const trimmed = `${value}`.trim().replace(/\s/g, '')
  const isVoidOrDirty = isComma(trimmed) || trimmed.length === 0 || isAlpha
  const formatted = isVoidOrDirty ? '0' : commify(trimmed).replace(/\.$/, '.0')
  // replaces [,]->[.]

  return {
    formatted,
    isValid: isAlpha ? false : value === '' || isFinite(Number(formatted))
  }
}

export const useFormattedInputHandler = (initState?: number) => {
  const { address, isConnected } = useConnectedAccount()
  const [value, setValue] = useState<number>(initState!)

  const formattedValue = useMemo(
    () => parseUnits(validateInput(value).formatted, 18),
    [value]
  )

  const onChangeHandler: FormEventHandler<HTMLInputElement> = ({
    currentTarget: { value: newValue }
  }) => {
    const isCurrentZeroed = (value as any) === '0.'
    const formatted = isComma(newValue)
      ? `0${isCurrentZeroed ? '' : '.'}`
      : commify(newValue)

    setValue(validateInput(newValue).isValid ? formatted : 0)
  }

  const resetValue = () => setValue('' as any)

  const safeSetValue = (value: any) => {
    if (Number.isFinite(Number(value))) {
      setValue(shortifyDecimals(value, 8) as any)
    } else resetValue()
  }

  useEffect(() => {
    if (isConnected) resetValue()
    // clear input when change wallet
  }, [address])

  return {
    value,
    resetValue,
    formattedValue,
    onChangeHandler,
    setValue: safeSetValue
  }
}

export const defaultPrevented = (e: any) => {
  e.preventDefault?.()
  e.stopPropagation?.()
}