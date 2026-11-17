import { Button, Icon } from '@amadeus/react-design-factory'
import type { NotificationUndoActionProps } from './NotificationUndoAction.d'
import { NotificationUndoWrapper } from './NotificationUndoAction.styled'

const NotificationUndoAction = ({ message, onUndo }: NotificationUndoActionProps) => {
  return (
    <NotificationUndoWrapper>
      {message}
      <Button icon={<Icon name='undo' />} variant='text' onClick={onUndo}>
        Undo
      </Button>
    </NotificationUndoWrapper>
  )
}

export default NotificationUndoAction
