import { Badge, Button, colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const FilterTag = styled(Badge)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  border: none;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 400 !important;
`

export const EmptyFilterTag = styled(Badge)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: ${colors.cloud_40};
  color: ${colors.cloud_0};
  border: none;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 400 !important;
`

export const FieldLabel = styled.label`
  font-size: 14px;
`

export const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  overflow-wrap: anywhere;
`

export const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  border-radius: 9999px;
  font-size: 12px;
  line-height: 1.2;
  max-width: 100%;
  white-space: normal;
  word-break: break-word;
  flex-wrap: wrap;
`

export const CloseButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: ${colors.cloud_0};
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  padding: 0;
`
