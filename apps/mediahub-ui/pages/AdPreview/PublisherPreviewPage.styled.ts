import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

// A news-homepage mock (modelled on the layout of a large public broadcaster's front page) used to preview
// display ads in context. It is deliberately NOT styled as any real brand: neutral palette, generic wordmark.
const INK = '#141414'
const PAPER = '#f6f6f6'
const RULE = '#dcdcdc'
const ACCENT = '#b80000'

export const PreviewBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;
  background: ${colors.sky_90};
  color: ${colors.cloud_0};
  font-size: 13px;
  button {
    padding: 4px 12px;
    border: 1px solid ${colors.cloud_0};
    border-radius: 4px;
    background: transparent;
    color: ${colors.cloud_0};
    font: inherit;
    cursor: pointer;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`
export const Page = styled.div`
  min-height: 100vh;
  background: ${PAPER};
  color: ${INK};
  font-family: Helvetica, Arial, sans-serif;
  a {
    color: inherit;
    text-decoration: none;
  }
`
export const Masthead = styled.header`
  background: ${INK};
  color: #fff;
`
export const MastheadInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
`
export const Wordmark = styled.span`
  display: inline-flex;
  gap: 3px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  span {
    padding: 1px 8px;
    background: #fff;
    color: ${INK};
  }
`
export const MastheadLinks = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
`
export const Nav = styled.nav`
  border-bottom: 1px solid ${RULE};
  background: #fff;
  ul {
    display: flex;
    gap: 4px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    overflow-x: auto;
    list-style: none;
  }
  li a {
    display: block;
    padding: 12px 12px;
    border-bottom: 3px solid transparent;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }
  li a[aria-current='page'] {
    border-bottom-color: ${ACCENT};
  }
`
export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 48px;
`
export const AdSlot = styled.aside<{ $center?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $center }) => ($center ? 'center' : 'stretch')};
  gap: 4px;
  margin: 16px 0;
`
export const AdLabel = styled.span`
  color: #6b6b6b;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`
export const AdBox = styled.div<{ $width: number }>`
  width: 100%;
  max-width: ${({ $width }) => $width}px;
  background: #fff;
  border: 1px solid ${RULE};
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`
export const SectionTitle = styled.h2`
  margin: 24px 0 12px;
  padding-top: 8px;
  border-top: 3px solid ${INK};
  font-size: 20px;
`
export const LeadStory = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${RULE};
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
  h1 {
    margin: 0 0 8px;
    font-size: 32px;
    line-height: 1.15;
  }
  p {
    margin: 0 0 8px;
    color: #3d3d3d;
    line-height: 1.45;
  }
`
export const Thumb = styled.div<{ $hue: number; $ratio?: string }>`
  aspect-ratio: ${({ $ratio }) => $ratio ?? '16 / 9'};
  background: linear-gradient(
    135deg,
    hsl(${({ $hue }) => $hue}, 35%, 38%),
    hsl(${({ $hue }) => ($hue + 40) % 360}, 40%, 62%)
  );
`
export const Meta = styled.span`
  color: #6b6b6b;
  font-size: 12px;
`
export const Live = styled.span`
  margin-right: 6px;
  padding: 1px 6px;
  background: ${ACCENT};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`
export const CardGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 2}, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`
export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${RULE};
  h3 {
    margin: 4px 0 0;
    font-size: 17px;
    line-height: 1.25;
  }
  p {
    margin: 0;
    color: #3d3d3d;
    font-size: 14px;
    line-height: 1.4;
  }
`
export const AudioRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  strong {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.25;
  }
`
export const Rail = styled.div`
  display: flex;
  flex-direction: column;
`
export const MostRead = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: most;
  li {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${RULE};
    counter-increment: most;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
  }
  li::before {
    content: counter(most);
    color: ${ACCENT};
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }
`
export const Footer = styled.footer`
  margin-top: 32px;
  padding: 24px 16px;
  background: ${INK};
  color: #c9c9c9;
  font-size: 13px;
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
`
