import styled from '@emotion/styled'
import { colors, IconButton } from '@amadeus/react-design-factory'
import { zIndex } from '@amadeus/react-design-factory/styles'

export const Page = styled('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen', 'panelWidth'].includes(propName) })<{
  twoCols: boolean
  fullScreen: boolean
  panelWidth: number
}>`
  display: grid;
  grid-template-columns: ${({ twoCols, fullScreen }) =>
    fullScreen ? '1fr' : twoCols ? `minmax(0, 1fr) var(--home-panel-width)` : '1fr'};
  row-gap: 14px;
  column-gap: 0;
  height: ${({ twoCols }) => (twoCols ? 'calc(100vh - 54px)' : 'auto')};
  overflow: ${({ twoCols }) => (twoCols ? 'hidden' : 'visible')};
  --home-panel-width: ${({ panelWidth }) => `${panelWidth}px`};
`

export const CarouselSection = styled.div`
  background-color: ${colors.cloud_0};
  border-radius: 5px;
  border: 1px solid ${colors.cloud_30};
  padding: 14px 14px 12px;
  margin: 0px 0px 28px 0px;
  min-height: 200px;
`

export const MetricsTableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const MetricsTablePanelBody = styled.div`
  max-height: 560px;
  overflow-y: auto;
  overflow-x: auto;
`

export const MetricsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`

export const MetricsHeadingGroup = styled.div`
  min-width: 0;
`

export const MetricsHeading = styled.h4`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: ${colors.cloud_100};
`

export const MetricsSubheading = styled.p`
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_70};
`

export const MetricsLegend = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`

export const MetricsLegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  line-height: 14px;
  color: ${colors.cloud_70};
`

export const MetricsLegendDot = styled('span', {
  shouldForwardProp: propName => propName !== 'kind',
})<{ kind: 'improved' | 'declined' | 'neutral' }>`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({ kind }) =>
    kind === 'improved' ? colors.forest_60 : kind === 'declined' ? colors.crimson_60 : colors.cloud_50};
`

export const MetricsTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 0;
  margin: 4px 0 12px;
  border-bottom: 1px solid ${colors.cloud_30};
`

export const MetricsTabButton = styled('button', {
  shouldForwardProp: propName => propName !== 'active',
})<{ active?: boolean }>`
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? colors.sky_80 : 'transparent')};
  border-radius: 0;
  padding: 8px 12px 7px;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${({ active }) => (active ? colors.cloud_100 : colors.cloud_100)};
  background: transparent;
  cursor: pointer;
  text-align: center;
`

export const MetricsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`

export const MetricsTableHeadCell = styled.th`
  padding: 7px 10px;
  border-bottom: 1px solid ${colors.cloud_30};
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: ${colors.cloud_80};
  text-align: left;
  background: ${colors.sky_10};

  &:not(:first-of-type) {
    text-align: center;
  }

  &:first-of-type {
    width: 220px;
  }
`

export const MetricsTableCell = styled.td`
  padding: 7px 10px;
  border-bottom: 1px solid ${colors.cloud_20};
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_100};
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:first-of-type) {
    text-align: center;
  }
`

export const MetricsValueStack = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

export const MetricsPrimaryValue = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_100};
  font-weight: 600;
`

export const MetricsTrend = styled('span', {
  shouldForwardProp: propName => propName !== 'trendKind',
})<{ trendKind: 'positive' | 'negative' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ trendKind }) =>
    trendKind === 'positive' ? colors.forest_60 : trendKind === 'negative' ? colors.crimson_60 : colors.cloud_60};
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
`

export const MetricsSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const MetricsPanel = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  overflow: hidden;
  background: ${colors.cloud_0};
`

export const MetricsPanelTitle = styled.h5`
  margin: 0;
  padding: 7px 10px;
  border-bottom: 1px solid ${colors.cloud_30};
  background: ${colors.sky_10};
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: ${colors.cloud_100};
`

export const MetricsVisualContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const MetricsVisualHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const MetricsVisualPeriod = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #666666;
  margin-bottom: 10px;
`

export const MetricsVisualLegend = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 28px;
`

export const MetricsVisualLegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.cloud_100};
`

export const MetricsVisualLegendSwatch = styled('span', {
  shouldForwardProp: propName => propName !== 'kind',
})<{ kind: 'last-year' | 'current-year' }>`
  width: 12px;
  height: 20px;
  display: inline-block;
  background: ${({ kind }) => (kind === 'last-year' ? colors.sky_40 : colors.sky_90)};
`

export const MetricsVisualChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`

export const MetricsVisualChartRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`

export const MetricsVisualAxisColumn = styled.div`
  width: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4px;
`

export const MetricsVisualAxisTicks = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.cloud_70};
`

export const MetricsVisualAxisLabel = styled.div`
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.cloud_100};
  white-space: nowrap;
`

export const MetricsVisualBarsColumn = styled.div`
  flex: 1;
  min-width: 0;
`

export const MetricsVisualBarsTrack = styled.div`
  height: 120px;
  border-bottom: 1px solid ${colors.cloud_40};
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  align-items: stretch;
  gap: 14px;
`

export const MetricsVisualBarGroup = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
`

export const MetricsVisualBar = styled('span', {
  shouldForwardProp: propName => !['kind', 'heightPercent'].includes(propName),
})<{ kind: 'last-year' | 'current-year'; heightPercent: number }>`
  display: block;
  width: 10px;
  height: ${({ heightPercent }) => `${heightPercent}%`};
  min-height: 2px;
  background: ${({ kind }) => (kind === 'last-year' ? colors.sky_40 : colors.sky_90)};
`

export const MetricsVisualLabelsRow = styled.div`
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 14px;
`

export const MetricsVisualLabel = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.cloud_70};
`

export const MetricsVisualUpdatedAt = styled.div`
  margin-top: 6px;
  font-size: 13px;
  line-height: 16px;
  color: ${colors.cloud_70};
`

export const LeftCol = styled('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen', 'campaignCanvas'].includes(propName) })<{
  twoCols: boolean
  fullScreen: boolean
  campaignCanvas?: boolean
}>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 24px 24px 0;
  ${({ fullScreen }) =>
    fullScreen
      ? `
  display: none;
`
      : ''}
  height: ${({ twoCols }) => (twoCols ? '100%' : 'auto')};
  overflow-y: ${({ twoCols }) => (twoCols ? 'auto' : 'visible')};

  ${({ campaignCanvas }) =>
    campaignCanvas
      ? `
    > :not([data-campaign-canvas='true']) {
      display: none;
    }
  `
      : ''}
`

export const RightCol = styled('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen'].includes(propName) })<{
  twoCols: boolean
  fullScreen: boolean
}>`
  padding: 0;
  min-width: 0;
  min-height: 0;
  height: ${({ twoCols }) => (twoCols ? '100%' : 'auto')};
  overflow: ${({ twoCols }) => (twoCols ? 'hidden' : 'visible')};
  position: relative;
`

export const HomeMaxResizeHandle = styled.span`
  position: absolute;
  top: 0;
  left: -6px;
  bottom: 0;
  width: 12px;
  cursor: col-resize;
  z-index: 10;

  &:hover {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 5px;
      width: 2px;
      background: ${colors.sky_60};
    }
  }
`

export const SidePanelViewport = styled('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen'].includes(propName) })<{
  twoCols: boolean
  fullScreen: boolean
}>`
  height: ${({ twoCols }) => (twoCols ? '100%' : 'auto')};
  margin: 0;
`

export const FloatingAiButton = styled(IconButton)`
  position: fixed;
  right: 16px;
  bottom: 72px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 999px;
  background: ${colors.sky_60} !important;
  box-shadow: 0 0 8px rgba(128, 128, 128, 0.25);
  z-index: ${zIndex.stickyFooter};

  &:hover {
    background: ${colors.sky_80} !important;
  }

  .amadeus-icon {
    color: ${colors.cloud_0} !important;
  }
`

export const FloatingPanelOverlay = styled.div`
  position: fixed;
  right: 16px;
  top: 54px;
  bottom: 0;
  width: 360px;
  z-index: ${zIndex.drawer};
  box-shadow: 0 8px 24px rgba(0, 8, 53, 0.2);
  border-radius: 8px;
  overflow: hidden;
`
