import AntModal from 'antd/es/modal'
import styled from '@emotion/styled'
import { colors } from '../../styles'

export const Modal = styled(AntModal)`
  .amadeus-modal-content {
    padding: 24px;
    .amadeus-modal-header {
      margin-bottom: 20px;
      .amadeus-modal-title {
        font-size: 20px;
        font-weight: 500;
      }
    }

    .amadeus-modal-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .amadeus-modal-footer {
      margin-top: 20px;
    }
  }

  .amadeus-btn-color-default {
    color: ${colors.sky_60};
    border: 1px solid ${colors.sky_60};
  }
`
