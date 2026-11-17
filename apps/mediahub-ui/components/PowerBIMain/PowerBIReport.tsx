import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import { Embed, models, Report } from 'powerbi-client'
import { PowerBIEmbed } from 'powerbi-client-react'
import { getInitialReportConfig } from './helpers'
import { Icon, Spinner, Tab } from '@amadeus/react-design-factory'
import { PowerbiReportType, useReportsQuery } from './PowerBIReport.queries'
import { PowerBIReportType, ReportFilterType } from './PowerBIReport.d'
import * as Styled from './PowerBI.styled'

const PowerBIReport: FC<PowerBIReportType> = () => {
  const initialReportConfig = getInitialReportConfig({
    accessToken: '',
    embedUrl: '',
  })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const previousWrapperSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const [screenConfig, setScreenConfig] = useState({ reportWidth: 0, reportHeight: window.innerHeight / 2 })
  const [dataIsReady, setDataIsReady] = useState(false)
  const [report, setReport] = useState<Report>()
  const [currentTabConfig, setCurrentTabConfig] = useState(initialReportConfig)
  const { reportsData, reportsLoading } = useReportsQuery()
  const [tabs, setTabs] = useState<{ key: string; label: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [noReportBanner, setNoReportBanner] = useState(false)

  //Set the iframe size to fit in the wrapper
  const fitToWrapper = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Reserve top space used by tabs/padding and fit iframe in remaining box.
    const horizontalPadding = 40
    const verticalPaddingAndTabs = 72
    const reportRatio = 0.5625
    const maxWidth = Math.max(0, wrapper.clientWidth - horizontalPadding)
    const maxHeight = Math.max(0, wrapper.clientHeight - verticalPaddingAndTabs)
    if (!maxWidth || !maxHeight) return

    //Max size of report is 1300x730 (aspect ratio 0.5625), so calculate size to fit in wrapper but don't exceed max report size
    const MAX_REPORT_WIDTH = 1300
    let resizedWidth = Math.min(maxWidth, MAX_REPORT_WIDTH)
    let resizedHeight = resizedWidth * reportRatio

    if (resizedHeight > maxHeight) {
      resizedHeight = maxHeight
      resizedWidth = resizedHeight / reportRatio
    }

    setScreenConfig(prev => {
      const newWidth = Math.floor(resizedWidth)
      const newHeight = Math.floor(resizedHeight)
      // Bail out if nothing changed — prevents re-render cascade
      if (prev.reportWidth === newWidth && prev.reportHeight === newHeight) return prev
      return { reportWidth: newWidth, reportHeight: newHeight }
    })
  }, [])

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
    if (!report || !reportsData?.length) return

    try {
      const currentTabData = reportsData.find(data => data.pageName === currentTabConfig.pageName)
      const pages = await report.getPages()
      const targetPage = currentTabData && pages.find(page => page.name === currentTabData.pageId)
      const filters = (await getUpdatedFilters()) as ReportFilterType[]

      if (targetPage) {
        await targetPage.setFilters(filters)
      }
    } catch (error) {
      console.log('PBI: Update filters error', error)
    }
  }, [report, reportsData, currentTabConfig])

  useEffect(() => {
    if (!report) return

    const onLoaded = async () => {
      await updateCurrentPageFilters()
      setLoading(false)
    }

    report.on('loaded', onLoaded)
    // Also run once here in case the listener is attached after initial load.
    onLoaded()

    return () => {
      report.off('loaded', onLoaded)
    }
  }, [report, updateCurrentPageFilters])

  useEffect(() => {
    if (reportsData) {
      setDataIsReady(true)
      if (!reportsData[0]?.filters[0]?.ids.length) {
        setNoReportBanner(true)
        setLoading(false)
      } else {
        setLoading(true)
        //Set the reportConfig received from BE, and set the tabs based on the page names received from BE
        setCurrentTabConfig({
          accessToken: reportsData[0]?.token?.value,
          embedUrl: reportsData[0]?.embedURL,
          pageName: reportsData[0]?.pageName,
        })

        const tabsData = reportsData.map(reportData => ({ label: reportData.pageName, key: reportData.pageName }))
        setTabs(tabsData)
      }
    }
  }, [reportsData])

  const getUpdatedFilters = async () => {
    const currentTabData = reportsData?.find(data => data.pageName === currentTabConfig.pageName)
    const pages = await report?.getPages()
    const targetPage = currentTabData && pages?.find(page => page.name === currentTabData.pageId)

    if (targetPage) {
      report?.setPage(targetPage.name)
      await targetPage.setActive()
      //The report is set on report level in ART side
      const reportLevelFilters = (await report?.getFilters()) as ReportFilterType[]
      const correspondObaFilters = reportsData?.find(page => page.pageName === currentTabConfig.pageName)?.filters
      const updatedFilters: ReportFilterType[] = []
      reportLevelFilters.map(filter => {
        correspondObaFilters?.forEach(obaFilter => {
          if (obaFilter.name === (filter.target as models.IFilterColumnTarget)?.column) {
            updatedFilters.push({
              ...filter,
              values: obaFilter?.ids?.length ? obaFilter.ids : [],
              operator: 'In',
            } as ReportFilterType)
          }
        })
      })

      return updatedFilters
    }
  }

  const onChangeTab = async (pageName: string) => {
    const requestedReport: PowerbiReportType | undefined = reportsData?.find(report => report.pageName === pageName)

    if (requestedReport) {
      if (requestedReport) {
        setCurrentTabConfig({
          ...currentTabConfig,
          accessToken: requestedReport.token?.value,
          embedUrl: requestedReport.embedURL,
          pageName: requestedReport.pageName,
          settings: {
            ...currentTabConfig.settings,
            navContentPaneEnabled: false,
            panes: {
              pageNavigation: { visible: false },
            },
          },
        })
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
        <Tab items={tabs} onChange={onChangeTab} />
        <Styled.Frame width={screenConfig.reportWidth} height={screenConfig.reportHeight}>
          {(reportsLoading || loading) && <Spinner size={'large'} />}
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
