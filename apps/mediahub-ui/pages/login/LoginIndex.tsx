import React from 'react'
import styled from '@emotion/styled'
import LoginPage from '@mediahub/mediahub-ui/components/LoginPage/LoginPage'
import backgroundLogin from '@mediahub/mediahub-ui/assets/background-login.jpg'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: url(${backgroundLogin});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  text-align: center;
  color: white;
`

const LoginIndex: React.FC = () => {
  return (
    <Root>
      <Body>
        <LoginPage />
      </Body>
      <Footer>&copy; {new Date().getFullYear()} TRAVELAUDIENCE.COM GmbH. All rights reserved</Footer>
    </Root>
  )
}

export default LoginIndex
