import React, { FC, useMemo } from 'react'
import type { StepperProps } from './Stepper.d'
import * as Styled from './Stepper.styled'

const Stepper: FC<StepperProps> = ({ items, current, status, fullWidth = false, onChange, id }) => {
  const modifiedItems = useMemo(() => {
    return items?.map(item => {
      return {
        ...item,
        ...(item.onClick && { className: 'amadeus-steps-item-clickable' }),
      }
    })
  }, [items])

  return (
    <Styled.Stepper items={modifiedItems} current={current} status={status} fullWidth={fullWidth} onChange={onChange} id={id} />
  )
}

export default Stepper
