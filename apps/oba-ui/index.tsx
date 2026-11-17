import React from 'react'
import ObaGqlProvider from './ObaGqlProvider'
import ObaRoutes from './ObaRoutes'

const ObaUi = () => {
  return (
    <ObaGqlProvider>
      <ObaRoutes />
    </ObaGqlProvider>
  )
}

export default ObaUi
