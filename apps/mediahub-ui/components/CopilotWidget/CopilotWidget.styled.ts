import styled from '@emotion/styled'
import { Grid, Text, colors, IconButton } from '@amadeus/react-design-factory'

export const ChatIconButton = styled(IconButton)`
  width: 31px;
  height: 28px;
  padding: 5px;
  &:hover {
    background-color: ${colors.sky_30} !important;
    border-radius: 3px;
  }
  &:hover svg {
    opacity: 1 !important;
  }
`

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
  overflow-y: auto;
  flex: 1;
`

export const MessageBubble = styled.div<{ role: 'user' | 'bot' }>`
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  word-break: break-word;
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  background-color: ${({ role }) => (role === 'user' ? colors.sky_60 : colors.cloud_20)};
  color: ${({ role }) => (role === 'user' ? colors.cloud_0 : colors.cloud_100)};

  /* Markdown content styles for bot messages */
  p {
    margin: 0 0 0.5em;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin: 0.25em 0 0.5em;
    padding-left: 1.4em;
  }

  li + li {
    margin-top: 0.2em;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.8125rem;
    background: ${({ role }) => (role === 'user' ? 'rgba(255,255,255,0.2)' : colors.cloud_30)};
    padding: 1px 4px;
    border-radius: 3px;
  }

  pre {
    margin: 0.5em 0;
    padding: 8px 10px;
    border-radius: 6px;
    background: ${({ role }) => (role === 'user' ? 'rgba(0,0,0,0.15)' : colors.cloud_30)};
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }

  a {
    color: ${({ role }) => (role === 'user' ? colors.cloud_0 : colors.sky_60)};
    text-decoration: underline;
  }

  table {
    border-collapse: collapse;
    margin: 0.5em 0;
    font-size: 0.8125rem;
    width: 100%;
  }

  th,
  td {
    border: 1px solid ${({ role }) => (role === 'user' ? 'rgba(255,255,255,0.3)' : colors.cloud_40)};
    padding: 4px 8px;
    text-align: left;
  }

  th {
    font-weight: 600;
    background: ${({ role }) => (role === 'user' ? 'rgba(0,0,0,0.1)' : colors.cloud_30)};
  }

  blockquote {
    margin: 0.5em 0;
    padding-left: 10px;
    border-left: 3px solid ${({ role }) => (role === 'user' ? 'rgba(255,255,255,0.4)' : colors.cloud_40)};
    color: ${({ role }) => (role === 'user' ? 'rgba(255,255,255,0.85)' : colors.cloud_50)};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.6em 0 0.3em;
    line-height: 1.3;
  }
  h1 {
    font-size: 1.15em;
  }
  h2 {
    font-size: 1.1em;
  }
  h3 {
    font-size: 1.05em;
  }

  hr {
    border: none;
    border-top: 1px solid ${({ role }) => (role === 'user' ? 'rgba(255,255,255,0.3)' : colors.cloud_30)};
    margin: 0.5em 0;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
  }
`

export const SuggestedActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  align-self: flex-start;
`

export const SuggestedActionButtonWrapper = styled.div`
  .amadeus-btn {
    padding: 6px 12px;
    border-radius: 16px;
    border: 1px solid ${colors.sky_50};
    background: transparent;
    color: ${colors.sky_60};
    font-size: 0.8125rem;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
      background-color: ${colors.sky_10};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: transparent;
    }
  }
`

export const DotIndicator = styled(Text.Label)`
  display: inline-block;
  animation: typing-bounce 1.2s infinite ease-in-out;
  color: ${colors.cloud_50};
  font-size: 0.8125rem;

  &:nth-of-type(1) {
    animation-delay: 0s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing-bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }
`

export const TypingIndicator = styled(Grid.Col)`
  align-self: flex-start;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: ${colors.cloud_20};
  width: fit-content;
  margin-top: 4px;
`

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding: 12px 0 4px;
`

export const StyledTextarea = styled.textarea`
  flex: 1;
  resize: none;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.4;
  min-height: 38px;
  max-height: 120px;
  overflow-y: auto;
  background: ${colors.cloud_0};
  color: ${colors.cloud_100};
  outline: none;

  &:focus {
    border-color: ${colors.sky_50};
  }

  &:disabled {
    background: ${colors.cloud_10};
    cursor: not-allowed;
  }
`

export const SendButtonWrapper = styled.div`
  .amadeus-btn {
    flex-shrink: 0;
    width: 38px !important;
    height: 38px !important;
    border: none !important;
    border-radius: 8px;
    background-color: ${colors.sky_60};
    color: ${colors.cloud_0};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      background-color: ${colors.cloud_30};
      cursor: not-allowed;
      border: none !important;
    }
  }
`

export const InlinePanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${colors.cloud_30};
  border-radius: 8px;
  background: ${colors.cloud_0};
`

export const InlineHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.cloud_20};
`

export const InlineBody = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 0 16px;
`

export const InlineFooter = styled.div`
  border-top: 1px solid ${colors.cloud_20};
  padding: 0 16px 12px;
`

export const DrawerTitle = styled(Grid.Row)`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DrawerTitleText = styled(Text.H4)`
  font-weight: 600;
  color: ${colors.cloud_100};
`

export const DrawerTitleIcon = styled(Text.H3)`
  font-size: 1.1rem;
`
