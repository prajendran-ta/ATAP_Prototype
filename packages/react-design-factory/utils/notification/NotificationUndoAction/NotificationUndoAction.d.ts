export type NotificationUndoActionProps = {
  message: string
  onUndo: () => Promise<void> | void
}
