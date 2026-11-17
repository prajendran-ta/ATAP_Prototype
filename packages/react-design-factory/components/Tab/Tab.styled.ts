import styled from '@emotion/styled'
import { colors } from '../../styles/colors'

export const TabStyles = styled.div`
  /* Base tab layout */
  .amadeus-tabs .amadeus-tabs-tab {
    margin: 0;
    padding: 11px 16px;
  }

  /* Hover on the FULL tab */
  .amadeus-tabs-tab:hover {
    background-color: ${colors.sky_20};
  }

  /* Freeze text color */
  .amadeus-tabs-tab-btn {
    color: ${colors.sky_90};
  }

  .amadeus-tabs .amadeus-tabs-tab.amadeus-tabs-tab-active .amadeus-tabs-tab-btn {
    color: ${colors.sky_90};
  }

  /* Selected underline (ink bar) must be sky_90 */
  .amadeus-tabs-ink-bar {
    background-color: ${colors.sky_90};
    height: 3px !important;
  }
`
