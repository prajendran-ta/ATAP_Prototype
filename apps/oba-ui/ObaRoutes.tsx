import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import AdvertiserPlans from './pages/AdvertiserPlans'
import PlanSettings from './pages/PlanSettings/PlanSettings'
import CampaignAllocation from '@mediahub/oba-ui/pages/CampaignAllocation'
import BudgetDistribution from './pages/BudgetDistribution'
import ObaDetails from './pages/ObaDetails'

const ObaRoutes = () => {
  return (
    <Routes>
      <Route path='/plans' element={<AdvertiserPlans />} />
      <Route path='/plans/create' element={<PlanSettings />} />
      <Route path='/plans/:planId/settings' element={<PlanSettings />} />
      <Route path='/plans/:planId/campaign-allocation' element={<CampaignAllocation />} />
      <Route path='/plans/:planId/budget-distribution' element={<BudgetDistribution />} />
      <Route path='/plans/:planId/details' element={<ObaDetails />} />
      <Route path='/plans/:planId/details/settings' element={<PlanSettings />} />
      <Route path='/plans/:planId/details/campaign-allocation' element={<CampaignAllocation />} />
      <Route path='/plans/:planId/details/budget-distribution' element={<BudgetDistribution />} />
      <Route path='/' element={<Navigate to='/oba/plans' />} />
      <Route path='*' element={<h2>Page Not Found in OBA</h2>} />
    </Routes>
  )
}

export default ObaRoutes
