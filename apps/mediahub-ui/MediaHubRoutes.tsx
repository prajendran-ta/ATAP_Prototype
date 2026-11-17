import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'

const Home = lazy(() => import(/* webpackChunkName: "home" */ '@mediahub/mediahub-ui/pages/Home'))
const UserManagementPage = lazy(
  () => import(/* webpackChunkName: "user-management" */ '@mediahub/mediahub-ui/pages/UsersManagement'),
)
const NotificationsPage = lazy(
  () => import(/* webpackChunkName: "notifications" */ '@mediahub/mediahub-ui/pages/Notifications'),
)
const UnmappedCampaignsPage = lazy(
  () => import(/* webpackChunkName: "unmapped-campaigns" */ '@mediahub/mediahub-ui/pages/CampaignMapping'),
)
const CampaignsPage = lazy(
  () => import(/* webpackChunkName: "campaigns" */ '@mediahub/mediahub-ui/pages/CampaignMapping/campaignsIndex'),
)
const AllCampaignsPage = lazy(
  () => import(/* webpackChunkName: "all-campaigns" */ '@mediahub/mediahub-ui/pages/CampaignMapping/allCampaignsIndex'),
)
const AudienceBuilderPage = lazy(() => import(/* webpackChunkName: "audience-builder" */ '@mediahub/mediahub-ui/pages/AudienceBuilder'))
const AudienceBuilderDetailsPage = lazy(() =>
  import(/* webpackChunkName: "audience-builder" */ '@mediahub/mediahub-ui/pages/AudienceBuilder').then(m => ({
    default: m.AudienceBuilderDetailsPage,
  })),
)
const AudiencePage = lazy(() => import(/* webpackChunkName: "audience" */ '@mediahub/mediahub-ui/pages/Audience'))
const AudienceDetailsPage = lazy(() =>
  import(/* webpackChunkName: "audience" */ '@mediahub/mediahub-ui/pages/Audience').then(m => ({
    default: m.AudienceDetailsPage,
  })),
)
const AudienceFormPage = lazy(() =>
  import(/* webpackChunkName: "audience" */ '@mediahub/mediahub-ui/pages/Audience').then(m => ({
    default: m.AudienceFormPage,
  })),
)

const MediaHubRoutes = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user-management' element={<UserManagementPage />} />
      <Route path='/notifications' element={<NotificationsPage />} />
      <Route path='/campaigns' element={<CampaignsPage />} />
      <Route path='/unmapped-campaigns' element={<UnmappedCampaignsPage />} />
      <Route path='/all-campaigns' element={<AllCampaignsPage />} />
      <Route path='/audience-builder' element={<AudienceBuilderPage />} />
      <Route path='/audience-builder/:ruleId' element={<AudienceBuilderDetailsPage />} />
      <Route path='/audience' element={<AudiencePage />} />
      <Route path='/audience/new' element={<AudienceFormPage />} />
      <Route path='/audience/:audienceId/edit' element={<AudienceFormPage />} />
      <Route path='/audience/:audienceId' element={<AudienceDetailsPage />} />
    </Routes>
  )
}

export default MediaHubRoutes
