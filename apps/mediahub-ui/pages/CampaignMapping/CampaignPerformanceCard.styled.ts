import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const PerformanceCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 5px;
  background: ${colors.cloud_0};
`

export const MetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
`

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 12px;
  border-radius: 4px;
  background: ${colors.cloud_10};
`

// Metric name and 30-day total, right-aligned above the chart.
export const MetricHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 8px;
`

export const MetricLabel = styled.span`
  color: ${colors.cloud_70};
  font-size: 12px;
`

export const MetricValue = styled.span`
  color: ${colors.cloud_100};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
`

// Chart grid: y-axis labels | plot, with the date axis under the plot.
export const Chart = styled.div`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  column-gap: 6px;
  row-gap: 2px;
  margin-top: 4px;
`

export const YAxis = styled.div`
  position: relative;
`

export const YTick = styled.span`
  position: absolute;
  right: 0;
  color: ${colors.cloud_70};
  font-size: 10px;
  line-height: 1;
  white-space: nowrap;
  transform: translateY(-50%);
`

export const MetricAxis = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.cloud_70};
  font-size: 11px;
`
