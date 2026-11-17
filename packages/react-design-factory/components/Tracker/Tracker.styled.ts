import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory/styles'
import { TrackerProps } from './Tracker.d'

export const TrackerContainer = styled.div<{ offsetHeight: number; offsetWidth: number }>`
  align-self: center;
  min-width: 200px;
  width: calc(100% - ${({ offsetWidth }) => offsetWidth}px);
  padding-top: ${({ offsetHeight }) => offsetHeight + 50}px;
`

export const TrackerBase = styled.div<Pick<TrackerProps, 'progressPercent' | 'thresholdPercent'>>`
  position: relative;
  height: 14px;
  width: 100%;
  background-color: ${({ thresholdPercent }) => (Number(thresholdPercent) > 100 ? colors.crimson_20 : colors.cloud_30)};
  border-radius: 3px;
`

export const LabelContainer = styled('div')<{ align?: 'flex-start' | 'center' | 'flex-end' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'center'};
`

export const ProgressBar = styled.div<Required<Pick<TrackerProps, 'progressPercent'>>>`
  height: 14px;
  width: ${({ progressPercent }) => `${progressPercent > 100 ? 100 : progressPercent}%`};
  background-color: ${({ progressPercent }) => (progressPercent > 100 ? colors.crimson_60 : colors.sky_50)};
  border-radius: 3px;
  transition: width 1s ease-in-out;
`

export const Threshold = styled.div<Required<Pick<TrackerProps, 'thresholdPercent'>>>`
  position: absolute;
  width: 8px;
  height: 50px;
  top: -18px; // (ProgressBar Height / 2 - Threshold Height / 2)
  left: ${({ thresholdPercent }) => `calc(${thresholdPercent > 100 ? 100 : thresholdPercent}% - 4px)`};
  background-color: ${({ thresholdPercent }) => (thresholdPercent > 100 ? colors.crimson_60 : colors.sky_80)};
  border-radius: 4px;
  transition: left 1s ease-in-out;
`

export const ThresholdLabel = styled(LabelContainer)<{ thresholdPercent: number; offsetWidth: number }>`
  position: absolute;
  min-width: ${({ offsetWidth }) => (offsetWidth > 120 ? offsetWidth : 120)}px;
  left: ${({ thresholdPercent }) => `calc(${thresholdPercent > 100 ? 100 : thresholdPercent}%)`};
  ${({ thresholdPercent }) => thresholdPercent > 100 && `&, * { color: ${colors.crimson_60}; }`}
  transform: translateX(-50%) translateY(calc(-100% - 40px));
  transition: left 1s ease-in-out;
`

export const TrackerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
