import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { sendCopilotMessage, startCopilotConversation } from '@mediahub/mediahub-ui/api/apiCopilot'
import {
  ChatIconButton,
  DrawerTitle,
  InputRow,
  MessageBubble,
  MessageList,
  SuggestedActionsWrapper,
  StyledTextarea,
  TypingIndicator,
  DrawerTitleIcon,
  DrawerTitleText,
  DotIndicator,
  SendButtonWrapper,
  SuggestedActionButtonWrapper,
  InlinePanel,
  InlineHeader,
  InlineBody,
  InlineFooter,
} from './CopilotWidget.styled'
import { Button, Drawer, colors, IconButton } from '@amadeus/react-design-factory'
import type { Message } from './CopilotWidget.d'
import { type CopilotActivity, type StartConversationResponse } from '@mediahub/mediahub-ui/api/apiCopilot/apiCopilot.d'
import type { IconProps } from '@amadeus/react-design-factory/components/Icon/Icon.d'

type CopilotWidgetProps = {
  titleText?: string
  triggerIconColor?: string
  triggerIconName?: IconProps['name']
  displayMode?: 'drawer' | 'inline'
  showTrigger?: boolean
  onClosePanel?: () => void
}

const readSSEStream = async (response: Response, onActivity: (activity: CopilotActivity) => void): Promise<void> => {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') return
      try {
        const activity: CopilotActivity = JSON.parse(data)
        onActivity(activity)
      } catch {
        // skip malformed events
      }
    }
  }
}

const CopilotWidget: React.FC<CopilotWidgetProps> = ({
  titleText = 'AskMia',
  triggerIconColor = colors.sky_90,
  triggerIconName = 'sparkles',
  displayMode = 'drawer',
  showTrigger = true,
  onClosePanel,
}) => {
  const { t } = useTranslation('copilot')
  const [isOpen, setIsOpen] = useState(displayMode === 'inline')
  const [initialized, setInitialized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to the latest message whenever messages update.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  // Start the conversation on first open.
  useEffect(() => {
    if (!isOpen || initialized) return

    let cancelled = false

    const init = async () => {
      setIsStreaming(true)
      try {
        const resp = await startCopilotConversation()
        if (!resp.ok) throw new Error(`chatbot/start returned ${resp.status}`)
        const data: StartConversationResponse = await resp.json()

        if (cancelled) return

        setConversationId(data.conversationId)

        if (data.activities?.length) {
          setMessages(
            data.activities.map(a => ({
              id: crypto.randomUUID(),
              role: 'bot',
              text: a.text,
              suggestedActions: a.suggestedActions?.actions,
            })),
          )
        }
        setInitialized(true)
      } catch (err) {
        if (!cancelled) {
          setMessages([
            {
              id: crypto.randomUUID(),
              role: 'bot',
              text: t('connectionError'),
            },
          ])
        }
      } finally {
        if (!cancelled) setIsStreaming(false)
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [isOpen, initialized])

  useEffect(() => {
    if (displayMode === 'inline') {
      setIsOpen(true)
    }
  }, [displayMode])

  const sendMessage = async (text: string) => {
    if (!conversationId || !text.trim() || isStreaming) return

    const trimmed = text.trim()
    setInputValue('')
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', text: trimmed }])
    setIsStreaming(true)

    try {
      const resp = await sendCopilotMessage(conversationId, trimmed)
      if (!resp.ok) throw new Error(`chatbot/message returned ${resp.status}`)

      await readSSEStream(resp, activity => {
        if (activity.type === 'message' && activity.text) {
          setMessages(prev => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: 'bot',
              text: activity.text,
              suggestedActions: activity.suggestedActions?.actions,
            },
          ])
        }
      })
    } catch {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'bot', text: t('genericError') }])
    } finally {
      setIsStreaming(false)
      setTimeout(() => textareaRef.current?.focus(), 50)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const handleClosePanel = () => {
    setIsOpen(false)
    setInitialized(false)
    setMessages([])
    setConversationId(null)
    setInputValue('')
    onClosePanel?.()
  }

  const drawerContent = (
    <MessageList>
      {messages.map(msg => (
        <React.Fragment key={msg.id}>
          <MessageBubble role={msg.role}>
            {msg.role === 'bot' ? (
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, ...props }) => (
                    <a {...props} target='_blank' rel='noopener noreferrer'>
                      {children}
                    </a>
                  ),
                }}
              >
                {msg.text}
              </Markdown>
            ) : (
              msg.text
            )}
          </MessageBubble>
          {msg.role === 'bot' && msg.suggestedActions?.length ? (
            <SuggestedActionsWrapper>
              {msg.suggestedActions.map(action => (
                <SuggestedActionButtonWrapper>
                  <Button key={action.value} onClick={() => sendMessage(action.value)} disabled={isStreaming}>
                    {action.title}
                  </Button>
                </SuggestedActionButtonWrapper>
              ))}
            </SuggestedActionsWrapper>
          ) : null}
        </React.Fragment>
      ))}
      {isStreaming && (
        <TypingIndicator>
          <DotIndicator>●</DotIndicator>
          <DotIndicator>●</DotIndicator>
          <DotIndicator>●</DotIndicator>
        </TypingIndicator>
      )}
      <div ref={bottomRef} />
    </MessageList>
  )

  const composer = (
    <InputRow>
      <StyledTextarea
        ref={textareaRef}
        rows={1}
        placeholder='Ask something...'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isStreaming || !initialized}
      />
      <SendButtonWrapper>
        <Button onClick={() => sendMessage(inputValue)} disabled={isStreaming || !inputValue.trim() || !initialized} title='Send'>
          ➤
        </Button>
      </SendButtonWrapper>
    </InputRow>
  )

  if (displayMode === 'inline') {
    return (
      <InlinePanel>
        <InlineHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DrawerTitle>
              <DrawerTitleIcon>✦</DrawerTitleIcon>
              <DrawerTitleText>{titleText}</DrawerTitleText>
            </DrawerTitle>
            <IconButton iconName='xmark' color={colors.cloud_80} width={12} height={12} onClick={handleClosePanel} title='Close chat' />
          </div>
        </InlineHeader>
        <InlineBody>{drawerContent}</InlineBody>
        <InlineFooter>{composer}</InlineFooter>
      </InlinePanel>
    )
  }

  return (
    <>
      {showTrigger ? (
        <ChatIconButton
          iconName={triggerIconName}
          color={triggerIconColor}
          height={20}
          width={20}
          onClick={() => setIsOpen(true)}
        />
      ) : null}

      <Drawer
        title={
          <DrawerTitle>
            <DrawerTitleIcon>✦</DrawerTitleIcon>
            <DrawerTitleText>{titleText}</DrawerTitleText>
          </DrawerTitle>
        }
        width='380px'
        placement='right'
        open={isOpen}
        onClose={handleClosePanel}
        footer={composer}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default CopilotWidget
