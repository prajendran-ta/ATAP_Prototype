import { colors, IconButton } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'

export const UsersOptionsButton = styled(IconButton)`
    width: 31px;
    height: 28px;
    padding:5px;
    &:hover {
        background-color: ${colors.sky_30} !important;
        border-radius: 3px;
    }
    &:hover svg {
    opacity: 1 !important;
  }
`