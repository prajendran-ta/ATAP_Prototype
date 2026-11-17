import React from 'react'
import { colors } from '@amadeus/react-design-factory'
import type { AtiInsight } from './campaignFlowData'

// Parses a demand label like "205M" into its numeric millions value.
const parseM = (value: string) => Number(value.replace(/[^0-9.]/g, '')) || 0
// Parses a percent label like "25%" into its numeric value.
const parsePct = (value: string) => Number(value.replace(/[^0-9.]/g, '')) || 0

const VIOLET = '#9240cc'

type Props = { insight: AtiInsight }

// Dual-axis Top Destination chart: grouped LY/CY demand bars (left axis, millions) plus a
// CY-vs-LY growth line with per-point % labels (right axis, percent). SVG, viewBox-scaled so it
// fills the response card width — mirrors the Figma "Top Destination" visual.
export const AtiTopDestinationChart: React.FC<Props> = ({ insight }) => {
  const rows = insight.destinations
  const demandMax = insight.demandAxisMax
  const growthMax = insight.growthAxisMaxPercent

  // viewBox coordinate space (scales responsively via width=100%).
  const W = 960
  const H = 440
  const padLeft = 44
  const padRight = 44
  const padTop = 16
  const padBottom = 84
  const plotW = W - padLeft - padRight
  const plotH = H - padTop - padBottom

  const groupW = plotW / rows.length
  const barGap = 3
  const barW = Math.max(4, (groupW - barGap * 3) / 2)

  const yDemand = (m: number) => padTop + plotH - (m / demandMax) * plotH
  const yGrowth = (p: number) => padTop + plotH - (p / growthMax) * plotH
  const groupCenter = (i: number) => padLeft + groupW * i + groupW / 2

  const demandTicks = [0, 50, 100, 150, 200, 250, 300].filter(t => t <= demandMax)
  const growthTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45].filter(t => t <= growthMax)

  const linePoints = rows.map((row, i) => `${groupCenter(i)},${yGrowth(parsePct(row.cyVsLy))}`).join(' ')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width='100%'
      role='img'
      aria-label={`${insight.chartTitle}: last-year vs current-year demand and growth by destination`}
      style={{ display: 'block', minHeight: 300 }}
    >
      {/* horizontal grid lines + left (demand) axis labels */}
      {demandTicks.map(t => {
        const y = yDemand(t)
        return (
          <g key={`d-${t}`}>
            <line x1={padLeft} y1={y} x2={W - padRight} y2={y} stroke={colors.cloud_30} strokeWidth={1} />
            <text x={padLeft - 6} y={y + 3} textAnchor='end' fontSize={11} fill={colors.cloud_70}>
              {t === 0 ? '0M' : `${t}M`}
            </text>
          </g>
        )
      })}

      {/* right (growth) axis labels */}
      {growthTicks.map(t => (
        <text key={`g-${t}`} x={W - padRight + 6} y={yGrowth(t) + 3} textAnchor='start' fontSize={11} fill={VIOLET}>
          {`${t}%`}
        </text>
      ))}

      {/* grouped LY / CY bars */}
      {rows.map((row, i) => {
        const cx = groupCenter(i)
        const lyX = cx - barW - barGap / 2
        const cyX = cx + barGap / 2
        const lyY = yDemand(parseM(row.ly))
        const cyY = yDemand(parseM(row.cy))
        const base = padTop + plotH
        return (
          <g key={`bars-${row.destination}`}>
            <rect x={lyX} y={lyY} width={barW} height={base - lyY} fill={colors.sky_90} rx={1} />
            <rect x={cyX} y={cyY} width={barW} height={base - cyY} fill={colors.sky_40} rx={1} />
            <text
              x={cx}
              y={base + 14}
              textAnchor='end'
              fontSize={10}
              fill={colors.cloud_70}
              transform={`rotate(-45 ${cx} ${base + 14})`}
            >
              {row.destination.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* CY-vs-LY growth line + points + % labels */}
      <polyline points={linePoints} fill='none' stroke={VIOLET} strokeWidth={1.6} strokeLinecap='round' />
      {rows.map((row, i) => {
        const x = groupCenter(i)
        const y = yGrowth(parsePct(row.cyVsLy))
        return (
          <g key={`pt-${row.destination}`}>
            <circle cx={x} cy={y} r={2.6} fill={VIOLET} />
            <text x={x} y={y - 6} textAnchor='middle' fontSize={10} fontWeight={600} fill={VIOLET}>
              {row.cyVsLy}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default AtiTopDestinationChart
