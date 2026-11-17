import styled from '@emotion/styled'
import { Text } from '@amadeus/react-design-factory'

export const Wrapper = styled.div<{ dataIsReady: boolean }>`
  display: ${({ dataIsReady }) => (dataIsReady ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  padding: 10px 24px;
`

export const Frame = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  min-height: 400px;
  margin-left: auto;
  margin-right: auto;

  & iframe {
    height: 100%;
    width: 100%;
    border: none !important;
    overflow: hidden;
  }

  .powerbi-iframe-embed {
    position: relative;
    height: 100%;
    width: 100%;
  }
`

export const NoReportWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
`

export const NoReportText = styled(Text.H6)`
  margin-left: 8px;
  vertical-align: middle;
`
