import styled from '@emotion/styled'
import backgroundLogin from '@mediahub/mediahub-ui/assets/background-login.jpg'

export const ButtonWrapper = styled.div`
  width: 400px;

  button {
    width: 100% !important;
    font-size: large !important;
    border: none !important;
  }
`

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: url(${backgroundLogin});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Footer = styled.div`
  text-align: center;
  color: white;
`
