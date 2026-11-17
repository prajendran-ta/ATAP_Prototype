import { IReportEmbedConfiguration, models } from 'powerbi-client'
import { InitialReportConfig } from './PowerBIReport.d'

export const getInitialReportConfig = ({
  accessToken,
  embedUrl,
  pageName,
  filters,
}: InitialReportConfig): IReportEmbedConfiguration => {
  return {
    type: 'report',
    embedUrl,
    accessToken,
    tokenType: models.TokenType.Embed,
    pageName,
    filters,
    settings: {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToWidth,
      },
      bars: {
        actionBar: {
          visible: true,
        },
      },
      navContentPaneEnabled: false,
      filterPaneEnabled: false,
      panes: {
        bookmarks: {
          visible: false,
        },
        fields: {
          expanded: true,
        },
        filters: {
          expanded: false,
          visible: false,
        },
        pageNavigation: {
          visible: false,
        },
        selection: {
          visible: true,
        },
        syncSlicers: {
          visible: true,
        },
        visualizations: {
          expanded: true,
        },
      },
    },
  }
}
