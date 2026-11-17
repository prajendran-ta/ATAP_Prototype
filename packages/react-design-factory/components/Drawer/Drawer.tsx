import type { DrawerProps } from './Drawer.d'
import { drawerStyles, StyledDrawer } from './Drawer.styled'

const Drawer = (props: DrawerProps) => {
  const { renderContent, mode, children, ...rest } = props
  return (
    <StyledDrawer
      styles={{
        mask: drawerStyles.mask,
        content: drawerStyles.content,
        header: drawerStyles.header,
        body: {
          ...drawerStyles.body,
          overflowY: drawerStyles.body.overflowY as React.CSSProperties['overflowY'],
        },
        footer: drawerStyles.footer,
      }}
      {...rest}
    >
      {renderContent ? renderContent() : children}
    </StyledDrawer>
  )
}

export default Drawer
