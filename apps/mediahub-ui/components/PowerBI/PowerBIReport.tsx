import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import { Embed, models, Report } from 'powerbi-client'
import { PowerBIEmbed } from 'powerbi-client-react'
import { getInitialReportConfig, mapPowerBIBackendFilters } from './helpers'
import { Icon, Spinner } from '@amadeus/react-design-factory'
import { useReportMediaPlanQuery } from './PowerBIReport.queries'
import { PowerBIReportType, ReportFilterType } from './PowerBIReport.types'
import * as Styled from './PowerBIReport.styled'

type PowerBIPage = Awaited<ReturnType<Report['getPages']>>[number]
type PowerBIVisual = Awaited<ReturnType<PowerBIPage['getVisuals']>>[number]

const applyVisualFilters = async (visuals: PowerBIVisual[], backendFilters: NonNullable<SharedQL.PowerbiReport['filters']>) => {
  for (const visual of visuals) {
    const visualFilters = (await visual.getFilters()) as ReportFilterType[]
    const updatedVisualFilters = mapPowerBIBackendFilters(visualFilters, backendFilters) as ReportFilterType[]

    if (updatedVisualFilters.length === 0) continue

    await visual.setFilters(updatedVisualFilters)
  }
}

const PowerBIReport: FC<PowerBIReportType> = ({ mediaPlanFilter }) => {
  const initialReportConfig = getInitialReportConfig({
    accessToken: '',
    embedUrl: '',
  })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const previousWrapperSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const contentBoundsRef = useRef<{ maxRight: number; maxBottom: number } | null>(null)
  const [screenConfig, setScreenConfig] = useState({ reportWidth: 0, reportHeight: 0 })
  const [dataIsReady, setDataIsReady] = useState(false)
  const [report, setReport] = useState<Report>()
  const [currentTabConfig, setCurrentTabConfig] = useState(initialReportConfig)
  const { reportData, reportLoading } = useReportMediaPlanQuery(mediaPlanFilter)
  const [tabs, setTabs] = useState<{ key: string; label: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [noReportBanner, setNoReportBanner] = useState(false)

  const calcHeightFromBounds = useCallback((width: number): number => {
    const bounds = contentBoundsRef.current
    if (!bounds || !bounds.maxRight) return 0
    // Use the canvas aspect ratio (maxRight:maxBottom from all visuals) to scale height.
    // Avoid padding so the iframe doesn't exceed the canvas height (which causes the gray outspace).
    const scale = width / bounds.maxRight
    return Math.ceil(bounds.maxBottom * scale) + 2
  }, [])

  //Set the iframe size to fit in the wrapper
  const fitToWrapper = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const horizontalPadding = 8
    const maxWidth = Math.max(0, wrapper.clientWidth - horizontalPadding)
    if (!maxWidth) return

    const newWidth = Math.floor(maxWidth)
    const newHeight = calcHeightFromBounds(newWidth)

    setScreenConfig(prev => {
      // Bail out if nothing changed — prevents re-render cascade
      if (prev.reportWidth === newWidth && prev.reportHeight === newHeight) return prev
      return { reportWidth: newWidth, reportHeight: newHeight }
    })
  }, [calcHeightFromBounds])

  // Re-calculate size when the wrapper transitions from display:none to display:block
  useEffect(() => {
    if (dataIsReady) {
      // Use rAF to ensure the DOM has painted and clientWidth is available
      const id = requestAnimationFrame(() => fitToWrapper())
      return () => cancelAnimationFrame(id)
    }
  }, [dataIsReady, fitToWrapper])

  //handles sidebar open/close + window resize
  useEffect(() => {
    fitToWrapper()
    window.addEventListener('resize', fitToWrapper)

    let observer: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined' && wrapperRef.current) {
      observer = new ResizeObserver(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        const width = wrapper.clientWidth
        const height = wrapper.clientHeight
        const previous = previousWrapperSizeRef.current

        if (width === previous.width && height === previous.height) return

        previousWrapperSizeRef.current = { width, height }
        fitToWrapper()
      })
      observer.observe(wrapperRef.current)
    }

    return () => {
      window.removeEventListener('resize', fitToWrapper)
      observer?.disconnect()
    }
  }, [])

  const updateCurrentPageFilters = useCallback(async () => {
    if (!report || !reportData) return

    try {
      const pages = await report.getPages()
      const targetPage = pages.find(page => page.name === reportData.pageId)
      const reportFilters = (await getUpdatedFilters()) as ReportFilterType[]
      const pageFilters = targetPage ? ((await getUpdatedPageFilters(targetPage)) as ReportFilterType[]) : undefined
      const visuals = targetPage ? await targetPage.getVisuals() : []

      if (targetPage) {
        await report.setFilters(reportFilters)
        if (pageFilters) await targetPage.setFilters(pageFilters)
        if (reportData.filters?.length) await applyVisualFilters(visuals, reportData.filters)
      }
    } catch (error) {
      console.log('PBI: Update filters error', error)
    }
  }, [report, reportData, currentTabConfig.pageName])

  useEffect(() => {
    if (!report) return

    const onLoaded = async () => {
      await updateCurrentPageFilters()
      setLoading(false)
    }

    const onRendered = async () => {
      try {
        const pages = await report.getPages()
        const activePage = pages.find(p => p.isActive)
        if (!activePage) return

        const visuals = await activePage.getVisuals()
        if (!visuals.length) return

        let maxRight = 0
        let maxBottom = 0
        for (const visual of visuals) {
          const layout = (visual as PowerBIVisual & { layout?: { x?: number; y?: number; width?: number; height?: number } }).layout
          if (!layout) continue
          maxRight = Math.max(maxRight, (layout.x ?? 0) + (layout.width ?? 0))
          maxBottom = Math.max(maxBottom, (layout.y ?? 0) + (layout.height ?? 0))
        }

        if (!maxRight || !maxBottom) return

        contentBoundsRef.current = { maxRight, maxBottom }

        const currentWidth = wrapperRef.current?.clientWidth ?? 0
        if (!currentWidth) return

        const neededHeight = calcHeightFromBounds(currentWidth)
        setScreenConfig(prev => (prev.reportHeight === neededHeight ? prev : { ...prev, reportHeight: neededHeight }))
      } catch {
        //
      }
    }

    report.on('loaded', onLoaded)
    report.on('rendered', onRendered)
    // Also run once here in case the listener is attached after initial load.
    onLoaded()

    return () => {
      report.off('loaded', onLoaded)
      report.off('rendered', onRendered)
    }
  }, [report, updateCurrentPageFilters, calcHeightFromBounds])

  useEffect(() => {
    if (reportData) {
      setDataIsReady(true)
      setNoReportBanner(false)
      setLoading(true)
      setCurrentTabConfig(prev => ({
        ...prev,
        accessToken: reportData.token?.value,
        embedUrl: reportData.embedURL,
        pageName: reportData.pageName,
      }))

      setTabs([{ label: reportData.pageName, key: reportData.pageName }])
      return
    }

    if (!reportLoading) {
      setNoReportBanner(true)
      setLoading(false)
    }
  }, [reportData, reportLoading])

  const getUpdatedFilters = async () => {
    if (!reportData) return undefined
    const pages = await report?.getPages()
    const targetPage = pages?.find(page => page.name === reportData.pageId)

    if (targetPage) {
      report?.setPage(targetPage.name)
      await targetPage.setActive()
      //The report is set on report level in ART side
      const reportLevelFilters = (await report?.getFilters()) as ReportFilterType[]
      const correspondObaFilters = reportData.filters
      const updatedFilters = mapPowerBIBackendFilters(reportLevelFilters, correspondObaFilters) as ReportFilterType[]

      return updatedFilters
    }
  }

  const getUpdatedPageFilters = async (targetPage: PowerBIPage) => {
    if (!reportData) return undefined

    const pageLevelFilters = (await targetPage.getFilters()) as ReportFilterType[]
    const correspondObaFilters = reportData.filters

    return mapPowerBIBackendFilters(pageLevelFilters, correspondObaFilters) as ReportFilterType[]
  }

  const onChangeTab = async (pageName: string) => {
    const requestedReport = reportData?.pageName === pageName ? reportData : undefined

    if (requestedReport) {
      if (requestedReport) {
        setCurrentTabConfig(getInitialReportConfig({
          accessToken: requestedReport.token?.value,
          embedUrl: requestedReport.embedURL,
          pageName: requestedReport.pageName,
        }))
      }
    }
  }

  if (noReportBanner) {
    return (
      <Styled.NoReportWrapper>
        <Icon name='infoCircle' width={30} height={30} status='primary' />
        <Styled.NoReportText>
          Charts and dashboards become available once you follow at least one advertiser.
        </Styled.NoReportText>
      </Styled.NoReportWrapper>
    )
  }

  return (
    <>
      <Styled.Wrapper ref={wrapperRef} dataIsReady={dataIsReady}>
        <Styled.Frame width={screenConfig.reportWidth} height={screenConfig.reportHeight}>
          {(reportLoading || loading) && <Spinner size={'large'} />}
          <PowerBIEmbed
            embedConfig={currentTabConfig}
            cssClassName={'powerbi-iframe-embed'}
            getEmbeddedComponent={(embedObject: Embed) => {
              setReport(embedObject as Report)
            }}
          />
        </Styled.Frame>
      </Styled.Wrapper>
    </>
  )
}

export default PowerBIReport
