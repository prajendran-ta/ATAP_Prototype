import React from 'react'
import type { Preview } from '@storybook/react-webpack5'
import { ConfigProvider } from '@amadeus/react-design-factory'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [Story => React.createElement(ConfigProvider, { children: React.createElement(Story) })],
}

export default preview
