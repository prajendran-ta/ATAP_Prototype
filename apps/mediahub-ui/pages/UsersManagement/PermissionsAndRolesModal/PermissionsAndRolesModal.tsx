import React, { useState } from 'react'
import { Drawer, Table, Button, colors, Icon, Grid, StickyFooter, Container } from '@amadeus/react-design-factory'
import { DrawerContent } from './PermissionsAndRolesModal.styled'
import type { AccessLevel, PermissionsAndRolesModalProps } from './PermissionsAndRolesModal.d'

const PermissionsAndRolesModal: React.FC<PermissionsAndRolesModalProps> = ({ summaryBanner }) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => setOpen(prev => !prev)

  const roles = ['Administrator', 'Standard User', 'Read Only']
  const accessMatrix: Record<string, Record<string, AccessLevel>> = {
    Advertisers: { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'Media Planning & Request': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'Campaign Management & Setup': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'Campaign Optimization & Pacing': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    Reports: { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'Market Insights': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'Data Management': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'Pricing & Billing': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
    'User Management': { Administrator: 'full', 'Standard User': 'none', 'Read Only': 'none' },
  }

  const renderIcon = (access: AccessLevel) => {
    switch (access) {
      case 'full':
        return <Icon name='checkCircle' color={colors.forest_60} height={18} width={18} />
      case 'none':
        return <Icon name='timesCircle' color={colors.cloud_50} height={18} width={18} />
      case 'view':
        return <Icon name='checkCircle' color={colors.cloud_50} height={18} width={18} />
    }
  }

  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    ...roles.map(role => ({
      title: role,
      dataIndex: role,
      key: role,
      align: 'center' as const,
      render: (access: AccessLevel) => renderIcon(access),
    })),
  ]

  const dataSource = Object.entries(accessMatrix).map(([module, permissions]) => ({
    key: module,
    module,
    ...permissions,
  }))

  return (
    <>
      <Button id='user-permissions-btn' onClick={toggleDrawer}>
        Roles & Permissions
      </Button>
      <Drawer
        title='Roles & Permissions'
        placement='right'
        width={'70vw'}
        onClose={toggleDrawer}
        open={open}
        style={{ padding: 0 }}
      >
        <DrawerContent>
          {summaryBanner}
          <Container.Section style={{ marginTop: 0 }}>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
          </Container.Section>
        </DrawerContent>
        <Grid.Row>
          <Grid.Col span={12}>
            <StickyFooter left={'30vw'} marginBottom={0}>
              <Button
                onClick={() => setOpen(false)}
                htmlType='button'
                id='user_management-permissions_roles_cancel-btn'
                variant='outlined'
              >
                Close
              </Button>
            </StickyFooter>
          </Grid.Col>
        </Grid.Row>
      </Drawer>
    </>
  )
}

export default PermissionsAndRolesModal
