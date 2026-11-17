import { Environment, ModuleName, ModulesObject } from './apiConfig.d'

export const config: Record<Environment, Record<ModuleName, string>> = {
  'staging-1': {
    oba: 'https://api.oba.atap.staging-1.advertising.amadeus.com',
    mapping: 'https://api.oba.atap.staging-1.advertising.amadeus.com',
    shared: 'https://api.shared.atap.staging-1.advertising.amadeus.com',
    advertiser: 'https://api.advertiser.atap.staging-1.advertising.amadeus.com',
    mediaplanner: 'https://api.plan.atap.staging-1.advertising.amadeus.com',
  },
  'staging-2': {
    oba: 'https://api.oba.atap.staging-2.advertising.amadeus.com',
    mapping: 'https://api.oba.atap.staging-2.advertising.amadeus.com',
    shared: 'https://api.shared.atap.staging-2.advertising.amadeus.com',
    advertiser: 'https://api.advertiser.atap.staging-2.advertising.amadeus.com',
    mediaplanner: 'https://api.plan.atap.staging-2.advertising.amadeus.com',
  },
  'staging-3': {
    oba: 'https://api.oba.atap.staging-3.advertising.amadeus.com',
    mapping: 'https://api.oba.atap.staging-3.advertising.amadeus.com',
    shared: 'https://api.shared.atap.staging-3.advertising.amadeus.com',
    advertiser: 'https://api.advertiser.atap.staging-3.advertising.amadeus.com',
    mediaplanner: 'https://api.plan.atap.staging-3.advertising.amadeus.com',
  },
  staging: {
    oba: 'http://api.oba.mediahub-testing.staging.travelaudience.cloud',
    mapping: 'http://api.oba.mediahub-testing.staging.travelaudience.cloud',
    shared: 'http://api.shared.mediahub-testing.staging.travelaudience.cloud',
    advertiser: 'http://api.advertiser.mediahub-testing.staging.travelaudience.cloud',
    mediaplanner: 'http://api.plan.mediahub-testing.staging.travelaudience.cloud',
  },
  'uat-1': {
    oba: 'https://api.oba.atap.uat-1.advertising.amadeus.com',
    mapping: 'https://api.oba.atap.uat-1.advertising.amadeus.com',
    shared: 'https://api.shared.atap.uat-1.advertising.amadeus.com',
    advertiser: 'https://api.advertiser.atap.uat-1.advertising.amadeus.com',
    mediaplanner: 'https://api.plan.atap.uat-1.advertising.amadeus.com',
  },
  'uat-2': {
    oba: 'https://api.oba.atap.uat-2.advertising.amadeus.com',
    mapping: 'https://api.oba.atap.uat-2.advertising.amadeus.com',
    shared: 'https://api.shared.atap.uat-2.advertising.amadeus.com',
    advertiser: 'https://api.advertiser.atap.uat-2.advertising.amadeus.com',
    mediaplanner: 'https://api.plan.atap.uat-2.advertising.amadeus.com',
  },
  uat: {
    oba: 'http://api.oba.mediahub-testing.uat.travelaudience.cloud',
    mapping: 'http://api.oba.mediahub-testing.uat.travelaudience.cloud',
    shared: 'http://api.shared.mediahub-testing.uat.travelaudience.cloud',
    advertiser: 'http://api.advertiser.mediahub-testing.uat.travelaudience.cloud',
    mediaplanner: 'http://api.plan.mediahub-testing.uat.travelaudience.cloud',
  },
  production: {
    oba: 'https://api.oba.atap.advertising.amadeus.com',
    mapping: 'https://api.oba.atap.advertising.amadeus.com',
    shared: 'https://api.shared.atap.advertising.amadeus.com',
    advertiser: 'https://api.advertiser.atap.advertising.amadeus.com',
    mediaplanner: 'https://api.plan.atap.advertising.amadeus.com',
  },
}

const getEnvFromHost = (): Environment => {
  // Localhost always uses the REACT_APP_LOCAL_ENV variable
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    const env = process.env.REACT_APP_LOCAL_ENV as Environment
    return env in config ? env : 'production'
  }

  const parts = location.host.split('.')
  const envCandidate = parts[1] as Environment
  return envCandidate in config ? envCandidate : 'production'
}

export const currentEnv = getEnvFromHost()

export const apiConfig: ModulesObject = config[currentEnv]
