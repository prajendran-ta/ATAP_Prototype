import { Button, colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const AdvertisersWrapper = styled.div`
  min-width: 900px;
  padding-bottom: 10px;
`

export const DropdownTrigger = styled(Button)<{ disabled: Boolean }>`
  border: 1px solid ${({ disabled }) => (disabled ? colors.cloud_40 : colors.sky_60)} !important;
  color: ${({ disabled }) => (disabled ? colors.cloud_40 : colors.sky_60)} !important;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

// Campaigns-mapped donut ("N Inc / M Tot"): a conic-gradient ring + label, matching the proposed
// design. Fully mapped = green ring; partial = orange arc over a grey remainder.
export const MappedCell = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const MappedRing = styled.span<{ pct: number }>`
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  /* Included = dark sky blue arc; remainder (total) = grey. No green/orange distinction. */
  background: ${({ pct }) => {
    const deg = Math.round(Math.max(0, Math.min(1, pct)) * 360)
    return `conic-gradient(${colors.sky_80} 0deg ${deg}deg, ${colors.cloud_30} ${deg}deg 360deg)`
  }};
  /* Punch out the centre so it reads as a ring, not a pie. */
  -webkit-mask: radial-gradient(circle 6px at 50% 50%, transparent 98%, #000 100%);
  mask: radial-gradient(circle 6px at 50% 50%, transparent 98%, #000 100%);
`

export const MappedLabel = styled.span`
  font-size: 14px;
  color: ${colors.cloud_100};
  white-space: nowrap;
`
