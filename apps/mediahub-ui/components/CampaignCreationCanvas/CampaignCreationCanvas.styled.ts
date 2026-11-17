import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

const AI_TINT = '#f8eeff'

export const Canvas = styled.section`
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: auto;
  background-color: ${colors.cloud_10};
  padding: 28px clamp(24px, 5vw, 72px) 48px;
`

export const CanvasInner = styled.div`
  width: min(100%, 1440px);
  margin: 0 auto;
`

export const CanvasHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
`

export const CanvasHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const CanvasTitle = styled.h1`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: ${colors.cloud_100};
  font-size: 20px;
  line-height: 26px;
  font-weight: 500;
`

export const LoadingState = styled.div`
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${colors.cloud_80};
  font-size: 14px;
`

export const StepperWrap = styled.div`
  margin-bottom: 24px;

  .amadeus-steps-item-title {
    font-size: 14px;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 18px;
  }

  .amadeus-steps-item-container {
    /* Vertically center the step label against the numbered circle. */
    display: flex;
    align-items: center;
  }

  .ant-steps-item {
    cursor: pointer;
  }
`

export const FormCard = styled.div`
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 8, 53, 0.05);
`

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  color: ${colors.cloud_100};
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
`

export const SubsectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 20px 0 10px;
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
`

export const Hint = styled.p`
  margin: 0 0 16px;
  color: ${colors.cloud_70};
  font-size: 13px;
  line-height: 18px;
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;

  & > div {
    width: 100%;
  }
`

export const AiField = styled(Field)`
  &[data-ai-filled='true'] {
    input,
    textarea,
    .ant-select-selector,
    .amadeus-select-selector,
    .ant-input-number,
    .ant-input-number-input,
    .ant-input-affix-wrapper,
    .ant-input {
      background: ${AI_TINT} !important;
      background-color: ${AI_TINT} !important;
    }
  }
`

export const FullWidthField = styled(Field)`
  grid-column: 1 / -1;
`

export const AiFullWidthField = styled(AiField)`
  grid-column: 1 / -1;
`

export const AiSelectControl = styled.div`
  .amadeus-select-selector,
  .ant-select-selector {
    background: ${colors.cloud_0} !important;
    background-color: ${colors.cloud_0} !important;
    border-color: ${colors.cloud_50} !important;
  }

  &[data-ai-filled='true'] {
    .amadeus-select-selector,
    .ant-select-selector {
      background: ${AI_TINT} !important;
      background-color: ${AI_TINT} !important;
      border-color: #b650ff !important;
    }
  }
`

export const MultiSelectControl = styled.div`
  width: 100%;

  .amadeus-select-selector,
  .ant-select-selector {
    background: ${colors.cloud_0} !important;
    background-color: ${colors.cloud_0} !important;
    border-color: ${colors.cloud_50} !important;
  }

  && .amadeus-select-selection-item {
    border: 1px solid ${colors.sky_60} !important;
    border-radius: 14px !important;
    background: ${colors.sky_60} !important;
    background-color: ${colors.sky_60} !important;
    color: ${colors.cloud_0} !important;
    font-weight: 500 !important;
  }

  && .amadeus-select-selection-item-remove,
  && .amadeus-select-selection-item-remove svg,
  && .ant-select-selection-item-remove,
  && .ant-select-selection-item-remove svg {
    color: ${colors.cloud_0} !important;
    fill: ${colors.cloud_0} !important;
  }

  &[data-ai-recommended='true'][data-ai-filled='true'] {
    .amadeus-select-selector,
    .ant-select-selector {
      background: ${AI_TINT} !important;
      background-color: ${AI_TINT} !important;
      border-color: #b650ff !important;
    }

    && .amadeus-select-selection-item {
      border-color: #b650ff !important;
      background: ${AI_TINT} !important;
      background-color: ${AI_TINT} !important;
      color: #9240cc !important;
    }

    && .amadeus-select-selection-item-remove,
    && .amadeus-select-selection-item-remove svg,
    && .ant-select-selection-item-remove,
    && .ant-select-selection-item-remove svg {
      color: #9240cc !important;
      fill: #9240cc !important;
    }
  }

  .amadeus-select-selector {
    min-height: 30px;
    height: auto;
    align-items: center;
  }

  .amadeus-select-selection-overflow {
    flex-wrap: wrap;
  }
`

export const FieldLabel = styled.span`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 20px;
  color: ${colors.cloud_100};
  font-size: 13px;
  line-height: 18px;
`

export const Required = styled.span`
  color: ${colors.crimson_60};
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  padding: 1px 6px;
  border: 1px solid ${colors.cloud_40};
  border-radius: 8px;
  background: ${colors.cloud_10};
  color: ${colors.cloud_70};
  font-size: 10px;
  line-height: 14px;
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  resize: vertical;
  border: 1px solid ${colors.cloud_50};
  border-radius: 4px;
  background: ${colors.cloud_0};
  color: ${colors.cloud_100};
  padding: 8px 10px;
  font: inherit;
  font-size: 13px;
  line-height: 18px;

  &:focus {
    outline: 2px solid ${colors.sky_20};
    border-color: ${colors.sky_60};
  }
`

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 32px;
`

export const FieldHint = styled.span`
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 24px;
`

export const FooterGroup = styled.div`
  display: inline-flex;
  gap: 10px;
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.cloud_20};

  & > div {
    width: 240px;
  }
`

export const ContextChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  padding: 3px 10px;
  border: 1px solid ${colors.sky_60};
  border-radius: 12px;
  background: ${colors.sky_10};
  color: ${colors.sky_80};
  font-size: 12px;
  line-height: 16px;
`

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 8px;
`

export const DataTable = styled.table`
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  color: ${colors.cloud_100};
  font-size: 13px;

  th {
    background: ${colors.sky_10};
    color: ${colors.cloud_100};
    font-weight: 500;
    text-align: left;
    padding: 9px 10px;
    border-bottom: 1px solid ${colors.cloud_30};
    white-space: nowrap;
  }

  td {
    padding: 8px 10px;
    border-bottom: 1px solid ${colors.cloud_30};
    vertical-align: top;
  }

  tbody tr:hover {
    background: ${colors.cloud_10};
  }
`

// Summary table: caret button to expand a campaign row into its second-level (ad group) rows.
export const CampaignExpandToggle = styled('button', {
  shouldForwardProp: propName => propName !== 'expanded',
})<{ expanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.cloud_100};
  font: inherit;
  text-align: left;
  cursor: pointer;

  svg {
    flex: 0 0 auto;
    transition: transform 0.15s ease;
    transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
  }
`

// A second-level (ad group / ad set / line item) row nested under a campaign in the Summary table.
export const AdGroupRow = styled.tr`
  background: ${colors.cloud_10};

  td:first-of-type {
    padding-left: 34px;
    color: ${colors.cloud_100};
  }
`

// "Level" column — a structural label (campaign level vs. nested second level), rendered as plain
// muted text (not a chip) so it doesn't compete with the Current/Action status chips.
export const LevelTag = styled('span', {
  shouldForwardProp: propName => propName !== '$nested',
})<{ $nested?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  color: ${({ $nested }) => ($nested ? colors.cloud_60 : colors.cloud_80)};
`

export const ChannelDataTable = styled(DataTable)`
  min-width: 760px;
  table-layout: fixed;

  th:nth-child(1),
  td:nth-child(1) {
    width: 30%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 32%;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 38%;
  }
`

export const ChannelSplitCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-width: 0;

  & > div:first-of-type {
    flex: 1 1 auto;
    min-width: 0;
  }
`

export const CellWithIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  &[data-ai-filled='true'] {
    padding: 2px 4px;
    border-radius: 4px;
    background: ${AI_TINT};
  }
`

// Summary-table cell that pairs a value with its AI chip — chip only, no background tint (keeps the
// summary readable when many cells are AI-recommended; the violet chip alone marks the value).
export const CellWithAiChip = styled.span`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`

// Inline "apply this edit to all campaigns" bar shown beneath a field when editing one campaign
// scope. Lets the user propagate the value to every campaign on the platform or across platforms.
export const ApplyToAllBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  margin-top: 6px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_80};
`

export const ApplyToAllLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${colors.cloud_70};
`

// Selectable action chip for the "apply to all" options (This platform / All platforms). Reads as a
// soft primary pill; clicking applies the edit to that scope.
export const ApplyToAllChip = styled.button`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 1px 10px;
  border: 1px solid ${colors.sky_30};
  border-radius: 11px;
  background: ${colors.sky_10};
  color: ${colors.sky_80};
  font: inherit;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;

  &:hover {
    background: ${colors.sky_20};
    border-color: ${colors.sky_40};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.sky_20};
  }
`

// Brief green confirmation shown in place of the bar after a value is propagated.
export const ApplyToAllDone = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.forest_70};
`

export const LinkButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 24px;
  padding: 2px 8px;
  border: 1px solid ${colors.sky_60};
  border-radius: 12px;
  background: ${colors.sky_10};
  color: ${colors.sky_80};
  font-size: 12px;
  line-height: 16px;
`

export const ReadOnlyChip = styled(Chip)`
  border-color: ${colors.cloud_40};
  background: ${colors.cloud_10};
  color: ${colors.cloud_80};
`

export const ChipRemove = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${colors.sky_20};
  }
`

export const ChipEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid ${colors.cloud_40};
  border-radius: 4px;
  background: ${colors.cloud_0};
`

export const MatchTypeRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px;
  gap: 12px;
  align-items: start;
`

export const CreativeLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

export const CreativeFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`

export const LanguageBar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${colors.cloud_20};

  /* The tab strip sizes to its content so the Add-language button sits right after the last tab. */
  & > *:first-child {
    flex: 0 1 auto;
    min-width: 0;
  }
`

// "Add language" dropdown styled as a secondary button sitting as the last item in the tab group.
// "Add language" = a Design Factory link-style trigger (sky-60 text + caret, no border) that opens
// a small menu popover of selectable languages, sitting as the last item in the tab group.
export const AddLanguageControl = styled.div`
  position: relative;
  flex: 0 0 auto;
  /* Align the link with the tab labels (tabs have their own top padding + underline below). */
  align-self: flex-start;
  margin-top: 8px;
`

export const AddLanguageButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 2px;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  font-family: inherit;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const AddLanguageMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 20;
  min-width: 160px;
  max-height: 220px;
  overflow-y: auto;
  padding: 4px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
  box-shadow: 0 4px 16px rgba(0, 8, 53, 0.16);
`

export const AddLanguageMenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${colors.cloud_100};
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 8px;
`

export const AssetTile = styled('button', {
  shouldForwardProp: propName => propName !== '$selected',
})<{ $selected?: boolean }>`
  position: relative;
  height: 80px;
  padding: 0;
  overflow: hidden;
  border: 2px solid ${({ $selected }) => ($selected ? colors.sky_60 : colors.cloud_30)};
  border-radius: 6px;
  background: ${colors.cloud_10};
  cursor: pointer;

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:focus-visible {
    outline: 2px solid ${colors.sky_40};
  }
`

export const AssetCheck = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${colors.sky_60};
`

export const AddAssetTile = styled.button`
  height: 80px;
  border: 1px dashed ${colors.cloud_50};
  border-radius: 6px;
  background: ${colors.cloud_0};
  color: ${colors.sky_60};
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: ${colors.sky_10};
  }
`

export const PreviewPanel = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_10};
`

export const PreviewLabel = styled.div`
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const SearchPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
`

export const PreviewHeading = styled.div`
  color: ${colors.cloud_100};
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
`

export const PreviewSubtext = styled.div`
  color: ${colors.cloud_70};
  font-size: 11px;
  line-height: 14px;
`

export const HotelCard = styled.div`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 10px;
  padding: 8px;
  border: 1px solid ${colors.cloud_20};
  border-radius: 6px;

  img,
  svg {
    width: 96px;
    height: 72px;
    border-radius: 4px;
    object-fit: cover;
  }
`

export const HotelMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_80};
`

export const DealBadge = styled.span`
  align-self: flex-start;
  padding: 0 6px;
  border-radius: 4px;
  background: ${colors.forest_10};
  color: ${colors.forest_60};
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
`

export const TextAd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 10px;
  border-top: 1px solid ${colors.cloud_20};
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_80};
`

export const TextAdSponsored = styled.span`
  color: ${colors.cloud_100};
  font-weight: 500;
`

export const CreativeFormatTag = styled.span`
  display: inline-flex;
  align-self: flex-start;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${colors.cloud_10};
  color: ${colors.cloud_70};
  font-size: 10px;
  line-height: 14px;
`

export const DisplayAdPreview = styled.div`
  overflow: hidden;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
`

export const DisplayAdMedia = styled.div`
  width: 100%;
  aspect-ratio: 1.91 / 1;
  overflow: hidden;
  background: ${colors.cloud_10};

  img,
  svg {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`

export const DisplayAdBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  color: ${colors.cloud_80};
  font-size: 12px;
  line-height: 16px;

  strong {
    color: ${colors.cloud_100};
  }
`

export const DisplayAdFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-top: 1px solid ${colors.cloud_20};
  color: ${colors.cloud_70};
  font-size: 11px;
`

export const VideoAdPreview = styled.div`
  overflow: hidden;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
`

export const VideoAdMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${colors.cloud_100};

  img,
  svg {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`

export const VideoAdPlay = styled.span`
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  padding: 6px 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.72);
  color: ${colors.cloud_0};
  font-size: 11px;
`

export const AudioAdPreview = styled.div`
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 10px;
  padding: 10px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
`

export const AudioArtwork = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
  background: ${colors.cloud_10};

  img,
  svg {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`

export const AudioAdDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  color: ${colors.cloud_80};
  font-size: 12px;
  line-height: 16px;

  strong {
    color: ${colors.cloud_100};
  }
`

export const AudioWaveform = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 20px;

  span {
    width: 3px;
    border-radius: 2px;
    background: ${colors.sky_60};
  }

  span:nth-child(1),
  span:nth-child(5) {
    height: 7px;
  }

  span:nth-child(2),
  span:nth-child(4) {
    height: 13px;
  }

  span:nth-child(3) {
    height: 18px;
  }
`

export const PinterestPreview = styled.div`
  width: 220px;
  overflow: hidden;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};

  img,
  svg {
    width: 100%;
    aspect-ratio: 3 / 4;
    display: block;
    object-fit: cover;
  }
`

export const SnapchatPreview = styled.div`
  width: 220px;
  height: 340px;
  overflow: hidden;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_100};

  img,
  svg {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`

export const SnapchatCaption = styled.div`
  padding: 8px;
  background: #fffc00;
  color: ${colors.cloud_100};
  font-size: 11px;
  line-height: 15px;
`

export const TextAdHeadline = styled.span`
  color: #1a0dab;
  font-size: 15px;
  line-height: 20px;
`

export const Sitelinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;

  span {
    color: #1a0dab;
  }
`

export const SocialPost = styled.div`
  overflow: hidden;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};

  img,
  svg {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`

export const SocialProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_100};
`

export const SocialAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${colors.sky_60};
  color: ${colors.cloud_0};
  font-size: 11px;
  font-weight: 600;
`

export const SocialBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  background: ${colors.cloud_10};
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_80};

  strong {
    display: block;
    color: ${colors.cloud_100};
  }
`

export const CtaButton = styled.span`
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 4px;
  background: ${colors.cloud_20};
  color: ${colors.cloud_100};
  font-size: 11px;
  font-weight: 500;
`

export const VerticalCard = styled.div`
  position: relative;
  align-self: center;
  width: 220px;
  height: 390px;
  overflow: hidden;
  border-radius: 14px;
  background: #000;

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }
`

export const VerticalOverlay = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  color: #fff;
  font-size: 12px;
  line-height: 16px;

  strong {
    font-size: 13px;
  }
`

export const VerticalCta = styled.span`
  align-self: stretch;
  padding: 6px;
  border-radius: 4px;
  background: #fe2c55;
  color: #fff;
  text-align: center;
  font-weight: 500;
`

export const SummaryGrid = styled.div`
  display: grid;
  /* auto-fit lets the remaining cards stretch to fill the row (empty tracks collapse). */
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`

export const SummaryStat = styled.div`
  padding: 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_10};
  font-size: 12px;
  line-height: 16px;
  color: ${colors.cloud_70};

  strong {
    display: block;
    margin-top: 4px;
    color: ${colors.cloud_100};
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
  }
`

export const SummaryPlatformCard = styled.div`
  margin-bottom: 10px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  overflow: hidden;
`

export const SummaryPlatformHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: ${colors.cloud_10};
  font-size: 13px;
  line-height: 18px;
  color: ${colors.cloud_100};

  & > :last-child {
    margin-left: auto;
    text-align: right;
  }
`

export const SummaryMonthGrid = styled.div`
  display: grid;
  /* Always keep all 12 month cards on a single line; they shrink to share the width. */
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 20px;
`

export const SummaryMonthCard = styled.div`
  padding: 8px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
  text-align: center;
  font-size: 11px;
  line-height: 14px;
  color: ${colors.cloud_70};

  strong {
    display: block;
    margin-top: 2px;
    color: ${colors.cloud_100};
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
  }
`

export const SummaryThumbStrip = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
`

export const SummaryThumb = styled.span`
  display: inline-flex;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${colors.cloud_30};

  svg {
    width: 100%;
    height: 100%;
  }
`

export const SummaryTruncateCell = styled.span`
  display: inline-block;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
`

export const LanguageTabLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const LanguageTabRemove = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${colors.cloud_70};
  cursor: pointer;

  &:hover {
    background: ${colors.cloud_20};
    color: ${colors.cloud_100};
  }
`

export const SummaryValueList = styled.ul`
  margin: 0;
  padding-left: 16px;
  list-style: disc;

  li {
    margin-bottom: 2px;
    color: ${colors.cloud_100};
  }
`

export const SummaryShowMore = styled.button`
  margin-top: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.sky_60};
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

// --- Additional-targeting rule builder (matches the in-app Query Rules pattern) -----------------
// Header row: the "Additional targeting" title with the Add-targeting button pushed to the right.
export const RuleHeader = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

// Full-width list of targeting rules, one linear row each (no card/background).
export const RuleBuilder = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// A single targeting rule laid out on one line: [ type select ] [ value editor + hint ] [ aside ].
// No background or border — a clean linear row.
export const RuleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const RuleControls = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 240px) 1fr auto;
  align-items: start;
  gap: 8px;
`

// Value cell for a rule row. AI-recommended styling comes from the ChipsEditor (MultiSelectControl)
// itself, so it matches the Audience field exactly; the type dropdown stays unstyled.
export const RuleValueCell = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

// Right-hand aside of a rule row: optional AI chip + the kebab menu, kept together and top-aligned.
export const RuleRowAside = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
`

export const RuleHint = styled.span`
  color: ${colors.cloud_70};
  font-size: 12px;
  line-height: 16px;
`

// Empty state shown when no additional-targeting rules have been added yet.
export const RuleEmptyState = styled.p`
  margin: 0;
  padding: 10px 0;
  color: ${colors.cloud_70};
  font-size: 13px;
  line-height: 18px;
`

// Campaign status chip in the Summary table. Colour maps to the lifecycle state:
// new → sky, update-needed → pumpkin (warning), no-update → forest (success), paused → cloud (neutral).
export const StatusChip = styled.span<{ $tone: 'new' | 'update' | 'noUpdate' | 'paused' }>`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 2px 10px;
  border: 1px solid;
  border-radius: 11px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;

  ${({ $tone }) => {
    switch ($tone) {
      case 'update':
        return `border-color: ${colors.pumpkin_60}; background: ${colors.pumpkin_10}; color: ${colors.pumpkin_70};`
      case 'noUpdate':
        return `border-color: ${colors.forest_60}; background: ${colors.forest_10}; color: ${colors.forest_70};`
      case 'paused':
        return `border-color: ${colors.cloud_40}; background: ${colors.cloud_10}; color: ${colors.cloud_80};`
      case 'new':
      default:
        return `border-color: ${colors.sky_60}; background: ${colors.sky_10}; color: ${colors.sky_80};`
    }
  }}
`

// Wraps the campaign-split Select with the current-status chip beside it (chip right of the select).
export const SplitWithStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > *:first-child {
    flex: 1 1 auto;
    min-width: 0;
  }
`

// Current (present-day) campaign status chip, shown next to the campaign-split dropdown and in each
// step's mini summary. Colour maps to the live state: live → forest (running), paused → pumpkin
// (warning), new → sky (not yet created).
export const CurrentStatusChip = styled.span<{ $tone: 'live' | 'paused' | 'new' }>`
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;

  ${({ $tone }) => {
    switch ($tone) {
      case 'live':
        return `border-color: ${colors.forest_60}; background: ${colors.forest_10}; color: ${colors.forest_70};`
      case 'paused':
        return `border-color: ${colors.pumpkin_60}; background: ${colors.pumpkin_10}; color: ${colors.pumpkin_70};`
      case 'new':
      default:
        return `border-color: ${colors.sky_60}; background: ${colors.sky_10}; color: ${colors.sky_80};`
    }
  }}
`

// ---- Google-style search ad preview (modelled on a real sponsored result, light mode) ----------------
// Google's own result colours (not part of the DF palette): link #1a0dab, body #4d5156, muted #70757a.
export const GoogleAd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
  color: #202124;
  font-family: Arial, 'Amadeus Neue Web', sans-serif;
`
export const GoogleAdHeading = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.cloud_30};
  font-size: 16px;
  font-weight: 500;
`
export const GoogleAdBrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const GoogleAdLogo = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  overflow: hidden;
  border-radius: 50%;
  background: #1f1a14;
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`
export const GoogleAdBrandText = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  line-height: 1.25;
  strong {
    font-size: 13px;
    font-weight: 400;
  }
  span {
    overflow: hidden;
    color: #70757a;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
export const GoogleAdHeadline = styled.span`
  color: #1a0dab;
  font-size: 18px;
  line-height: 1.3;
`
export const GoogleAdDescription = styled.p`
  margin: 0;
  color: #4d5156;
  font-size: 13px;
  line-height: 1.5;
  a {
    color: #1a0dab;
  }
`
export const GoogleAdSitelinks = styled.div`
  display: flex;
  flex-direction: column;
`
export const GoogleAdSitelink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  border-top: 1px solid ${colors.cloud_30};
  strong {
    display: block;
    font-size: 15px;
    font-weight: 400;
  }
  span {
    display: block;
    color: #70757a;
    font-size: 12px;
    line-height: 1.4;
  }
`

// ---- HTML5 display banners -----------------------------------------------------------------------
export const BannerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 8px;
`
export const BannerTile = styled('button', {
  shouldForwardProp: propName => propName !== '$selected',
})<{ $selected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border: 2px solid ${({ $selected }) => ($selected ? colors.sky_60 : colors.cloud_30)};
  border-radius: 6px;
  background: ${colors.cloud_10};
  color: ${colors.cloud_100};
  font-size: 12px;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid ${colors.sky_40};
  }
`
export const BannerFrameBox = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${colors.cloud_20};
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    background: ${colors.cloud_0};
    transform-origin: top left;
  }
`
export const BannerPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
`
export const BannerPreviewLabel = styled.span`
  color: ${colors.cloud_80};
  font-size: 12px;
`
