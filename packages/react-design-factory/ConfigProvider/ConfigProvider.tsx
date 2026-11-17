import React from 'react'
import AntdConfigProvider, { ConfigProviderProps } from 'antd/es/config-provider'
import '@ant-design/v5-patch-for-react-19'
import { useTranslation } from 'react-i18next'
import enUS from 'antd/es/locale/en_US'
import frFR from 'antd/es/locale/fr_FR'
import { colors } from '..'
import 'antd/dist/reset.css'
import '../styles/fonts.css'

const ConfigProvider = ({ children, ...props }: ConfigProviderProps) => {
  const { i18n } = useTranslation()
  const antdLocales: Record<string, typeof frFR> = { fr: frFR }
  const locale = antdLocales[i18n.language] ?? enUS

  return (
    <AntdConfigProvider
      prefixCls='amadeus'
      locale={locale}
      wave={{ disabled: true }}
      theme={{
        token: {
          // Common Styles
          fontFamily: "'Amadeus Neue Web', 'Arial', 'Noto Sans'",
          fontSize: 14,
          fontWeightStrong: 500,
          controlHeight: 30,
          controlHeightSM: 30,
          controlHeightLG: 48,
          // Border Styles
          borderRadius: 6,
          colorBorder: colors.cloud_40,
          // Primary colors
          colorPrimary: colors.sky_60,
          colorPrimaryHover: colors.sky_80,
          colorPrimaryActive: colors.sky_90,
          colorLink: colors.sky_60,
          colorLinkHover: colors.sky_80,
          colorLinkActive: colors.sky_90,
          // Error colors
          colorError: colors.crimson_60,
          colorErrorHover: colors.crimson_80,
          colorErrorActive: colors.crimson_90,
          // Disabled Colors
          colorTextDisabled: colors.cloud_100,
          colorBgContainerDisabled: colors.cloud_30,
        },
      }}
      {...props}
    >
      {children}
    </AntdConfigProvider>
  )
}

export default ConfigProvider
