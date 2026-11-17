import { useNavigate, useParams, useLocation } from 'react-router'
import { useNotification } from '@amadeus/react-design-factory'
import AudienceFormDrawer, { type AudienceFormValues } from './AudienceFormDrawer'
import { MOCK_AUDIENCES, type MockAudience } from './mockAudiences'
import { useGetAdvertiserOptionsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { getSharedAudiences, setSharedAudiences } from '../../shared/audienceStore'

export default function AudienceFormPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { audienceId } = useParams<{ audienceId: string }>()
  const notification = useNotification()
  const { data: advertiserData } = useGetAdvertiserOptionsQuery()
  const audiences = getSharedAudiences()
  const audienceRecords = audiences.length > 0 ? audiences : MOCK_AUDIENCES
  const initialAudience = audienceId ? audienceRecords.find(audience => audience.id === audienceId) : undefined
  const routeState = location.state as { returnTo?: string; advertiserId?: string } | null
  const advertiserOptions = (advertiserData?.advertisers?.advertisers ?? []).map(advertiser => ({
    label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
    value: String(advertiser.advertiserId),
  }))
  const returnTo = routeState?.returnTo ?? '/audience'
  const advertiserContextOption = advertiserOptions.find(option => option.value === routeState?.advertiserId)
    ?? advertiserOptions.find(option => option.label === initialAudience?.advertiser)
  const advertiserBreadcrumb = advertiserContextOption && returnTo.startsWith('/advertisers/')
    ? { label: advertiserContextOption.label.replace(/\s\([^)]*\)$/, ''), href: returnTo }
    : undefined

  const handleSave = (values: AudienceFormValues) => {
    const id = initialAudience?.id ?? `aud-${Date.now()}`
    const advertiserName = advertiserOptions.find(option => option.value === values.advertiser)?.label ?? values.advertiser
    const selectedPlatforms = values.platformAdvertisers ?? []
    const nextAudience: MockAudience = {
      id,
      advertiser: advertiserName,
      audienceName: values.audienceName,
      dataType: values.dataType,
      fileId: values.fileId,
      channels: selectedPlatforms.map(platform => platform.platform).join(', ') || 'Not configured',
      audienceSize: initialAudience?.audienceSize ?? 0,
      lastUpload: initialAudience?.lastUpload ?? '-',
      nextUpload: initialAudience?.nextUpload ?? '-',
      platformAdvertisers: selectedPlatforms,
      audienceRuleIds: values.audienceRuleIds ?? [],
    }
    const nextAudiences = initialAudience
      ? audienceRecords.map(audience => audience.id === initialAudience.id ? nextAudience : audience)
      : [nextAudience, ...audienceRecords]
    setSharedAudiences(nextAudiences)
    notification.success(initialAudience ? 'Audience updated successfully.' : 'Audience added successfully.')
    navigate(returnTo)
  }

  const handleDelete = () => {
    if (!initialAudience) return
    setSharedAudiences(audienceRecords.filter(audience => audience.id !== initialAudience.id))
    notification.success('Audience deleted successfully.')
    navigate(returnTo)
  }

  return (
    <AudienceFormDrawer
      open
      page
      mode={initialAudience ? 'edit' : 'create'}
      initialAudience={initialAudience}
      advertiserOptions={advertiserOptions}
      lockedAdvertiser={routeState?.advertiserId}
      advertiserBreadcrumb={advertiserBreadcrumb}
      onClose={() => navigate(returnTo)}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  )
}
