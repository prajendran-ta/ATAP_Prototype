export interface CopilotActivity {
  type: string
  text: string
  suggestedActions?: {
    actions: { title: string; value: string }[]
  }
}

export interface StartConversationResponse {
  conversationId: string
  activities: CopilotActivity[]
}
