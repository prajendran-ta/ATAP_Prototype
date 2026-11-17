import { Route, Routes } from 'react-router'
import AdvertiserPage from '@mediahub/advertisers-ui/pages/Advertisers'
import { AdvertiserDetailsPage } from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails'

const AdvertisersRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AdvertiserPage />} />
      <Route path='/:advertiserId/settings' element={<AdvertiserDetailsPage />} />
      <Route path='/:advertiserId/summary' element={<AdvertiserDetailsPage />} />
      <Route path='/:advertiserId' element={<AdvertiserDetailsPage />} />
    </Routes>
  )
}

export default AdvertisersRoutes
