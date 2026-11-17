export interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  suggestedActions?: { title: string; value: string }[]
}
