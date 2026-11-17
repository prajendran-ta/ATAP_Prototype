import { useEffect, useState, useMemo } from 'react'
import {
  Button,
  Drawer,
  Icon,
  Input,
  Select,
  Table,
  Text,
  Toggle,
  colors,
  useNotification,
  Form,
  Grid,
  StickyFooter,
  Container,
} from '@amadeus/react-design-factory'
import type { ColumnsType } from 'antd/es/table'
import {
  StyledSelect,
  SwitchField,
  DrawerContent,
  FieldsGrid,
  SwitchContainer,
  SwitchLabelField,
} from './UserManagementDetails.styled'
import { useUpdateUserField, MODULES, ROLE_ACCESS } from './UserManagementDetailsConfig'
import { useTranslation } from 'react-i18next'
import type {
  UserManagementDetailsDetailsProps,
  RoleKey,
  ModuleAccessRow,
  AccessLevel,
} from './UserManagementDetails.d'
import { capitalize } from '@amadeus/react-utils/utils/string'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'

const UserManagementDetails = ({ user, refetch, index }: UserManagementDetailsDetailsProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['advertisers', 'common'])
  const { updateFields } = useUpdateUserField()
  const [currentRole, setCurrentRole] = useState<RoleKey>((user.role?.[0] as RoleKey) ?? 'mh-read-only')
  const [isActive, setIsActive] = useState<boolean>(user.status.toLowerCase() === 'active')
  const [loading, setLoading] = useState<boolean>(false)
  const { hasPermission, isExternal } = useAuth()
  const { t: tNav } = useTranslation('nav')
  const canEdit = hasPermission('mh-user-write')

  const notification = useNotification()
  const [form] = Form.useForm()

  useEffect(() => {
    setCurrentRole((user.role?.[0] as RoleKey) ?? 'mh-read-only')
  }, [user.role])

  const columns: ColumnsType<ModuleAccessRow> = [
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
      width: 120,
      align: 'center',
      render: (access: AccessLevel) => {
        if (access === 'full') return <Icon name='checkCircle' color={colors.forest_60} height={18} width={18} />
        if (access === 'view') return <Icon name='checkCircle' color={colors.cloud_50} height={18} width={18} />
        return <Icon name='timesCircle' color={colors.cloud_50} height={18} width={18} />
      },
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
  ]

  const moduleRows: ModuleAccessRow[] = useMemo(() => {
    const accessMap = ROLE_ACCESS[currentRole] ?? ROLE_ACCESS['mh-read-only']
    return MODULES
      .filter(m => !isExternal || m.externalVisible)
      .map(m => {
        const label = 'navKey' in m
          ? tNav(isExternal && 'externalNavKey' in m ? m.externalNavKey : m.navKey)
          : 'label' in m ? m.label : ''
        return { key: m.key, module: label, access: accessMap[m.key] }
      })
  }, [currentRole, isExternal])

  const onFinish = async () => {
    if (!canEdit) return
    const prevRole = (user.role?.[0] as RoleKey) ?? 'mh-read-only'
    const prevIsActive = user.status.toLowerCase() === 'active'
    const payload: { role?: string; isActive?: boolean } = {}
    if (currentRole !== prevRole) payload.role = currentRole
    if (isActive !== prevIsActive) payload.isActive = isActive
    if (Object.keys(payload).length === 0) {
      notification.info('No changes to save.')
      return
    }
    setLoading(true)
    updateFields(user.id as unknown as number, payload).then(() => {
      refetch()
      setLoading(false)
    })
  }

  return (
    <>
      {!open && (
        <Button id={`user-details-${index}-btn`} variant='text' onClick={() => setOpen(true)}>
          Details
        </Button>
      )}

      <Drawer
        id='user-drawer'
        title='User Details'
        placement='right'
        width='40vw'
        onClose={() => {
          setOpen(false)
          setCurrentRole((user.role?.[0] as RoleKey) ?? 'mh-read-only')
          setIsActive(user.status.toLowerCase() === 'active')
        }}
        open={open}
      >
        {open && (
          <Form
            form={form}
            onFinish={onFinish}
            style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <DrawerContent>
              <Container.Section>
                <Text.H5 id='user-drawer_general_settings-ttl'>General Settings</Text.H5>
                <FieldsGrid>
                  <Input id='user-drawer_name-inp' label='User Name' value={capitalize(user.name)} disabled />
                  <Input id='user-drawer_email-inp' label='Email' value={capitalize(user.email)} disabled />
                  <StyledSelect>
                    <Select
                      id='user-drawer_role-sel'
                      placeholder='Select role'
                      label='Role'
                      value={currentRole}
                      disabled={!canEdit}
                      options={[
                        { label: 'Administrator', value: 'mh-administrator' },
                        { label: 'Standard User', value: 'mh-standard' },
                        { label: 'Read Only', value: 'mh-read-only' },
                      ]}
                      onChange={async newRole => {
                        setCurrentRole(newRole as RoleKey)
                      }}
                    />
                  </StyledSelect>
                  <SwitchContainer>
                    <SwitchField>
                      <Text.Label>Status</Text.Label>
                      <Toggle checked={isActive} onChange={checked => setIsActive(checked)} />
                    </SwitchField>
                    <SwitchLabelField id='user-drawer_status-swch'>{isActive ? 'Active' : 'Inactive'}</SwitchLabelField>
                  </SwitchContainer>
                </FieldsGrid>
              </Container.Section>
              <Container.Section>
                <Text.H5 id='user-drawer_module_access-ttl'>Module Access</Text.H5>
                <Table
                  columns={columns}
                  dataSource={moduleRows}
                  pagination={false}
                  id='user-drawer_module_access-tbl'
                  cellsIdPrefix='user-drawer_module_access'
                  rowKey='key'
                />
              </Container.Section>
            </DrawerContent>

            <Grid.Row>
              <Grid.Col span={12}>
                <StickyFooter left={'60vw'} marginBottom={0}>
                  <Button
                    onClick={() => setOpen(false)}
                    htmlType='button'
                    id='user-drawer_close-btn'
                    variant='outlined'
                  >
                    Close
                  </Button>
                  {canEdit && (
                    <Button htmlType='submit' id='user-drawer_save-btn' loading={loading}>
                      Save
                    </Button>
                  )}
                </StickyFooter>
              </Grid.Col>
            </Grid.Row>
          </Form>
        )}
      </Drawer>
    </>
  )
}

export default UserManagementDetails
