import { Route, Routes } from 'react-router'
import MediaplannerPage from '@mediahub/mediaplanner-ui/pages/Mediaplanner'
import BudgetDistribution from '@mediahub/mediaplanner-ui/pages/BudgetDistribution'
import MediaplannerGeneralSettings from '@mediahub/mediaplanner-ui/pages/MediaplannerGeneralSettings'
import MediaplannerProductSettings from '@mediahub/mediaplanner-ui/pages/MediaplannerProductSettings'
import MediaplannerDownloadSummary from '@mediahub/mediaplanner-ui/pages/MediaplannerDownloadSummary'

const MediaplannerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MediaplannerPage />} />
      <Route path='/create' element={<MediaplannerGeneralSettings />} />
      <Route path='/edit/:planId' element={<MediaplannerGeneralSettings />} />
      <Route path='/product-settings' element={<MediaplannerProductSettings />} />
      <Route path='/product-settings/:planId' element={<MediaplannerProductSettings />} />
      <Route path='/budget-distribution' element={<BudgetDistribution />} />
      <Route path='/budget-distribution/:planId' element={<BudgetDistribution />} />
      <Route path='/download-summary' element={<MediaplannerDownloadSummary />} />
      <Route path='/download-summary/:planId' element={<MediaplannerDownloadSummary />} />
    </Routes>
  )
}

export default MediaplannerRoutes
