import React from 'react'
import { LONDONER_BANNERS } from '../../components/CampaignFlow/campaignFlowProfiles'
import { ScaledBanner } from '../../components/CampaignCreationCanvas/CampaignAdPreview'
import * as Styled from './PublisherPreviewPage.styled'
import { StoryImage } from './StoryImage'

// A news-homepage mock for previewing The Londoner display banners in context.
// Headlines are original placeholders; branding is deliberately generic.

const NAV = ['Home', 'News', 'Sport', 'Business', 'Innovation', 'Culture', 'Arts', 'Travel', 'Earth', 'Video', 'Live']

type Story = { image: string; alt: string; title: string; summary: string; hue: number; meta: string }

const img = (n: number) => `/Images/news-${String(n).padStart(2, '0')}.png`

const TOP_STORIES: Story[] = [
  {
    image: img(1),
    alt: 'Two men shake hands outdoors as onlookers watch',
    title: 'Leaders shake on deal after a busy week of talks',
    summary: 'Business and political figures gathered outdoors as the agreement was sealed.',
    hue: 210,
    meta: '2 hrs ago · Politics',
  },
  {
    image: img(3),
    alt: 'A woman looks on from a courtroom bench',
    title: 'Court hears final arguments in long-running case',
    summary: 'A verdict is expected later this week.',
    hue: 190,
    meta: '3 hrs ago · World',
  },
  {
    image: img(4),
    alt: 'Illustration of human and robot hands reaching for a red button',
    title: 'Who has their hand on the button? The debate over AI control',
    summary: 'Experts split over how much power machines should be given.',
    hue: 30,
    meta: '4 hrs ago · Technology',
  },
  {
    image: img(7),
    alt: 'Two bearded men talk in a hospital room',
    title: 'Hospital visit puts spotlight on recovery ahead of Games of the Unbroken 2026',
    summary: 'Patients describe the road back to sport after serious injury.',
    hue: 340,
    meta: '5 hrs ago · Health',
  },
]

const MORE_NEWS: Story[] = [
  {
    image: img(8),
    alt: 'Stone huts on a rugged, rocky mountainside',
    title: 'Remote stone huts found on rugged hillside',
    summary: 'Walkers stumbled on the shelters high above the valley.',
    hue: 150,
    meta: '1 hr ago · Travel',
  },
  {
    image: img(9),
    alt: 'Aerial view of a long sandy beach and dunes at dusk',
    title: 'Winter calm settles over the dune coast',
    summary: 'Quiet beaches are drawing visitors out of season.',
    hue: 120,
    meta: '2 hrs ago · Earth',
  },
  {
    image: img(10),
    alt: 'Chambers carved from rock in an underground city',
    title: 'Underground city carved from rock opens new chambers',
    summary: 'Visitors can now explore passages closed for decades.',
    hue: 260,
    meta: '6 hrs ago · Culture',
  },
  {
    image: img(5),
    alt: 'Slices of toasted bread rings in a terracotta bowl',
    title: 'The humble twice-baked bread making a comeback',
    summary: 'Chefs are rediscovering a simple classic.',
    hue: 15,
    meta: '7 hrs ago · Food',
  },
  {
    image: img(6),
    alt: 'Armed men stand on a vehicle in mountainous terrain',
    title: 'Armed men gather in mountain region as tensions simmer',
    summary: 'Local officials call for calm.',
    hue: 300,
    meta: '8 hrs ago · World',
  },
  {
    image: img(2),
    alt: 'A man in a dinner suit aims a suppressed pistol from the shadows',
    title: 'First look at the new spy thriller',
    summary: 'A moody teaser hints at the film’s tone.',
    hue: 90,
    meta: '9 hrs ago · Culture',
  },
]

const AUDIO = [
  { title: 'Morning briefing', image: img(9) },
  { title: 'The Business Hour', image: img(1) },
  { title: 'Food Stories', image: img(5) },
  { title: 'Culture Club', image: img(10) },
  { title: 'Travel Talk', image: img(8) },
]
const MOST_READ = [
  'Leaders shake on deal after a busy week of talks',
  'Court hears final arguments in long-running case',
  'The debate over who controls AI',
  'Underground city opens new chambers',
  'The humble bread making a comeback',
]

const banner = (size: string) => LONDONER_BANNERS.find(item => item.size === size)

const Ad: React.FC<{ size: string; center?: boolean }> = ({ size, center }) => {
  const item = banner(size)
  if (!item) return null
  return (
    <Styled.AdSlot $center={center} role='complementary' aria-label='Advertisement'>
      <Styled.AdLabel>Advertisement</Styled.AdLabel>
      <Styled.AdBox $width={item.width}>
        <ScaledBanner banner={item} interactive />
      </Styled.AdBox>
    </Styled.AdSlot>
  )
}

const StoryCard: React.FC<{ story: Story }> = ({ story }) => (
  <Styled.Card>
    <StoryImage src={story.image} alt={story.alt} hue={story.hue} />
    <h3>{story.title}</h3>
    <p>{story.summary}</p>
    <Styled.Meta>{story.meta}</Styled.Meta>
  </Styled.Card>
)

const PublisherPreviewPage: React.FC = () => {
  const [lead, ...rest] = TOP_STORIES
  return (
    <Styled.Page>
      <Styled.Masthead>
        <Styled.MastheadInner>
          <Styled.Wordmark aria-label='Daily News'>
            <span>DAILY</span>
            <span>NEWS</span>
          </Styled.Wordmark>
          <Styled.MastheadLinks>
            <span>Sign in</span>
            <span>Notifications</span>
            <span>Search</span>
          </Styled.MastheadLinks>
        </Styled.MastheadInner>
      </Styled.Masthead>
      <Styled.Nav aria-label='Sections'>
        <ul>
          {NAV.map((item, index) => (
            <li key={item}>
              <a href='#' onClick={event => event.preventDefault()} aria-current={index === 0 ? 'page' : undefined}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </Styled.Nav>
      <Styled.Container>
        <Styled.AdSlot role='complementary' aria-label='Advertisement'>
          <img
            src='/Images/top-ad.png'
            alt='Advertisement'
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </Styled.AdSlot>
        <Styled.Grid>
          <div>
            <Styled.LeadStory>
              <div>
                <h1>{lead.title}</h1>
                <p>{lead.summary}</p>
                <Styled.Meta>
                  <Styled.Live>LIVE</Styled.Live>
                  {lead.meta}
                </Styled.Meta>
              </div>
              <StoryImage src={lead.image} alt={lead.alt} hue={lead.hue} />
            </Styled.LeadStory>
            <Styled.CardGrid $columns={3}>
              {rest.map(story => (
                <StoryCard key={story.title} story={story} />
              ))}
            </Styled.CardGrid>

            <Styled.SectionTitle>Only from Daily News</Styled.SectionTitle>
            <Styled.CardGrid $columns={2}>
              {MORE_NEWS.slice(0, 2).map(story => (
                <StoryCard key={story.title} story={story} />
              ))}
            </Styled.CardGrid>

            <Styled.SectionTitle>More news</Styled.SectionTitle>
            <Styled.CardGrid $columns={3}>
              {MORE_NEWS.map(story => (
                <StoryCard key={story.title} story={story} />
              ))}
            </Styled.CardGrid>

            <Styled.SectionTitle>Recommended audio</Styled.SectionTitle>
            <Styled.AudioRow>
              {AUDIO.map((item, index) => (
                <div key={item.title}>
                  <StoryImage src={item.image} alt='' hue={index * 60} ratio='1 / 1' />
                  <strong>{item.title}</strong>
                </div>
              ))}
            </Styled.AudioRow>
          </div>
          <Styled.Rail>
            <Ad size='300x250' />
            <Styled.SectionTitle>Most read</Styled.SectionTitle>
            <Styled.MostRead>
              {MOST_READ.map(title => (
                <li key={title}>{title}</li>
              ))}
            </Styled.MostRead>
            <Ad size='300x600' />
          </Styled.Rail>
        </Styled.Grid>
      </Styled.Container>
      <Styled.Footer>
        <div>
          <span>Terms of use</span>
          <span>Privacy</span>
          <span>Cookies</span>
          <span>Contact</span>
          <span>Demo page for ad preview only</span>
        </div>
      </Styled.Footer>
    </Styled.Page>
  )
}

export default PublisherPreviewPage
