import { join, dirname } from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5'

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../utils/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-docs'),
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (config) => {
    // Add SVGR loader to handle SVG imports as React components
    const fileLoaderRule = config.module?.rules?.find((rule) => {
      if (typeof rule !== 'object' || !rule) return false
      return rule.test instanceof RegExp && rule.test.test('.svg')
    })

    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      fileLoaderRule.exclude = /\.svg$/
    }

    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
export default config
