import { mockUseGetAdvertiserDetailsQuery, mockUseAuth } from '../mocks/AdvertiserDetails'

// PIB-1691: BPID field and 'Advertiser Name' label (now 'Advertiser name') removed for external SaaS build.
// Each test covers both modes explicitly.

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import AdvertiserDetails, { AdvertiserDetailsContent } from '../../AdvertiserDetails/AdvertiserDetails'
import { advertiserDetailsAdvertiserMock, advertiserDetailsQueryMock } from '../data/AdvertiserDetails'

describe('AdvertiserDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAuth.mockReturnValue({ isExternal: false })
    mockUseGetAdvertiserDetailsQuery.mockReturnValue({
      data: advertiserDetailsQueryMock,
      loading: false,
    })
  })

  test('links to the advertiser details subpage', () => {
    render(<AdvertiserDetails advertiser={advertiserDetailsAdvertiserMock} index={0} />)

    const detailsBtnById = document.getElementById('advertiser-details-0-btn')
    expect(detailsBtnById).not.toBeNull()
    expect(detailsBtnById).toHaveAttribute('href', `/advertisers/${advertiserDetailsAdvertiserMock.advertiserId}`)
  })
  test('renders general fields with advertiser data (internal)', async () => {
    render(<MemoryRouter><AdvertiserDetailsContent advertiser={advertiserDetailsAdvertiserMock} handleClose={jest.fn()} /></MemoryRouter>)

    expect(await screen.findByRole('heading', { name: 'General Settings' })).toBeInTheDocument()

    const nameInput = screen.getByLabelText('Advertiser Name') as HTMLInputElement
    const bpidInput = screen.getByLabelText('BPID') as HTMLInputElement
    const typeInput = screen.getByLabelText('Advertiser Type') as HTMLInputElement

    expect(nameInput.value).toBe('Hotel alpha')
    expect(bpidInput.value).toBe('BP123')
    expect(typeInput.value).toMatch(/hotel/i)
  })

  test('renders general fields without BPID (external)', async () => {
    mockUseAuth.mockReturnValue({ isExternal: true })
    render(<MemoryRouter><AdvertiserDetailsContent advertiser={advertiserDetailsAdvertiserMock} handleClose={jest.fn()} /></MemoryRouter>)

    expect(await screen.findByRole('heading', { name: 'General Settings' })).toBeInTheDocument()

    const nameInput = screen.getByLabelText('Advertiser Name') as HTMLInputElement
    const typeInput = screen.getByLabelText('Advertiser Type') as HTMLInputElement

    expect(nameInput.value).toBe('Hotel alpha')
    expect(typeInput.value).toMatch(/hotel/i)
    expect(screen.queryByLabelText('BPID')).not.toBeInTheDocument()
  })

  test('renders platform settings with the default platform', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><AdvertiserDetailsContent advertiser={advertiserDetailsAdvertiserMock} handleClose={jest.fn()} /></MemoryRouter>)

    await user.click(screen.getByText('Platforms'))
    const tableById = document.getElementById('advertiser-drawer_configuration-tbl')
    expect(tableById).not.toBeNull()
    expect(await screen.findByText('Amadeus DSP')).toBeInTheDocument()
    expect(screen.queryByText('Platform A')).not.toBeInTheDocument()
  })

  test('renders the default Amadeus DSP platform for every advertiser', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><AdvertiserDetailsContent advertiser={advertiserDetailsAdvertiserMock} handleClose={jest.fn()} /></MemoryRouter>)

    await user.click(screen.getByText('Platforms'))

    const defaultPlatformRow = screen.getByText('Amadeus DSP').closest('tr')
    expect(defaultPlatformRow).not.toBeNull()
    expect(defaultPlatformRow).toHaveTextContent('hotel alpha')
    expect(defaultPlatformRow).toHaveTextContent('1')
    expect(defaultPlatformRow).toHaveTextContent('Audience Enabled')
    expect(defaultPlatformRow?.querySelector('svg')).not.toBeNull()
  })
})
