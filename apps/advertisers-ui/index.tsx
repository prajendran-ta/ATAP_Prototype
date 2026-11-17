import React from 'react'
import AdvertisersGqlProvider from './AdvertisersGqlProvider'
import AdvertisersHubRoutes from './AdvertisersHubRoutes'
const AdvertisersUi = () => {
  return (
    <AdvertisersGqlProvider>
      <AdvertisersHubRoutes />
    </AdvertisersGqlProvider>
  )
}

export default AdvertisersUi
