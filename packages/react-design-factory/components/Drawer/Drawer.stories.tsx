import { useState } from 'react'
import Drawer from './Drawer'
import Table from '../Table/Table'
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { colors } from '../../styles/colors'

// Mock types for notifications
interface Notification {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  linkText?: string
  linkUrl?: string
  timeAgo: string
  showOBAButton?: boolean
}

interface NotificationGroup {
  title: string
  boldHeader?: boolean
  notifications: Notification[]
}

// Mock component for HomeAccordionGroupList
const HomeAccordionGroupList = ({ notificationGroups }: { notificationGroups: NotificationGroup[] }) => (
  <div>
    {notificationGroups.map((group, index) => (
      <div key={index} style={{ marginBottom: 16 }}>
        <h4 style={{ fontWeight: group.boldHeader ? 'bold' : 'normal', marginBottom: 8 }}>
          {group.title}
        </h4>
        {group.notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              padding: 12,
              marginBottom: 8,
              border: '1px solid #e0e0e0',
              borderRadius: 4,
              backgroundColor: notification.type === 'error' ? '#fff2f0' : notification.type === 'warning' ? '#fff7e6' : '#f0f9ff'
            }}
          >
            <div style={{ fontSize: 14, marginBottom: 4 }}>{notification.message}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{notification.timeAgo}</div>
            {notification.linkText && (
              <a href={notification.linkUrl} style={{ fontSize: 12, color: colors.sky_60 }}>
                {notification.linkText}
              </a>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
)

const mockUser = {
  name: 'First name Last name',
  email: 'f.lastname@amadeus.com',
  group: 'Campaign Manager (Admin)',
  location: 'Berlin',
  status: 'Active',
  modules: [
    'Advertisers',
    'Media Plans',
    'Campaign Management',
    'Campaign Monitoring & Reporting',
    'Markets Insite',
    'Campaign Optimization & Pacing',
    'Data Management',
    'Workflow Management',
    'User Management',
    'Trainings & Documentation',
  ],
}

// Define columns and data for the module access table
const moduleAccessColumns = [
  {
    title: 'Access',
    dataIndex: 'access',
    key: 'access',
    align: 'center' as const,
    width: 60,
    render: () => <CheckCircleOutlined style={{ color: '#6DC354', fontSize: 18 }} />,
  },
  {
    title: 'Module',
    dataIndex: 'module',
    key: 'module',
  },
]

const moduleAccessData = mockUser.modules.map((module, idx) => ({
  key: idx,
  module,
  access: 'Granted',
}))

const UserDetailsContent = () => (
  <div>
    <section style={{ margin: 24, padding: 24, backgroundColor: colors.cloud_0, borderRadius: 8 }}>
      <h3>General Settings</h3>
      <div className='user-details-grid' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label>User Name</label>
          <div>{mockUser.name}</div>
        </div>
        <div>
          <label>Email</label>
          <div>{mockUser.email}</div>
        </div>
        <div>
          <label>Group</label>
          <div>{mockUser.group}</div>
        </div>
        <div>
          <label>Location</label>
          <div>{mockUser.location}</div>
        </div>
        <div>
          <label>Status</label>
          <div>{mockUser.status}</div>
        </div>
      </div>
    </section>
    <section>
      <h3 style={{ padding: '0 24px' }}>Module Access</h3>
      <Table
        columns={moduleAccessColumns}
        dataSource={moduleAccessData}
        pagination={false}
        size='small'
        style={{ background: 'transparent', padding: 24 }}
      />
    </section>
  </div>
)

export default {
  title: 'Design Factory/Drawer',
  component: Drawer,
}

export const UserDetails = () => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open User Details Drawer</button>
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>User Details</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 16,
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label='Close'
            >
              <CloseOutlined style={{ fontSize: 20, color: colors.cloud_100 }} />
            </button>
          </div>
        }
        open={open}
        onClose={() => setOpen(false)}
        width={480}
        mode='userDetails'
        closable={false}
        renderContent={() => <UserDetailsContent />}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: colors.sky_60,
                color: colors.cloud_0,
                border: 'none',
                borderRadius: 4,
                padding: '8px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        }
      />
    </>
  )
}

export const Notifications = () => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Notifications Drawer</button>
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Notifications</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 16,
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label='Close'
            >
              <CloseOutlined style={{ fontSize: 20, color: colors.cloud_100 }} />
            </button>
          </div>
        }
        open={open}
        onClose={() => setOpen(false)}
        width={400}
        closable={false}
        mode='notifications'
        renderContent={() => (
          <div style={{ padding: 24 }}>
            <HomeAccordionGroupList notificationGroups={notificationGroups} />
          </div>
        )}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: colors.sky_60,
                color: colors.cloud_0,
                border: 'none',
                borderRadius: 4,
                padding: '8px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        }
      />
    </>
  )
}

const notificationGroups: NotificationGroup[] = [
  {
    title: 'Performance',
    boldHeader: true,
    notifications: [
      {
        id: 'perf-1',
        type: 'error',
        message: "OBA Name: Group ABC budget spent can't be negative",
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'perf-2',
        type: 'warning',
        message: 'Multiple Group budget exhausted for this Month',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'perf-3',
        type: 'error',
        message: "Multiple campaign Budget spent can't be negative",
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'perf-4',
        type: 'warning',
        message: 'OBA Name: Campaign ABC budget exhausted for this month',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
    ],
  },
  {
    title: 'Management',
    boldHeader: true,
    notifications: [
      {
        id: 'mgmt-1',
        type: 'info',
        message: 'Recommendations has been skipped for multiple Groups',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'mgmt-2',
        type: 'info',
        message: 'OBA Name: Recommendations has been skipped for Campaign Name',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'mgmt-3',
        type: 'info',
        message: 'OBA Name: Currency does not match that of Media plan',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'mgmt-4',
        type: 'info',
        message: 'OBA Name: Currency does not match that of Platform',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
      {
        id: 'mgmt-5',
        type: 'info',
        message: 'OBA Name: Campaign Name not found',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '6h ago',
        showOBAButton: true,
      },
    ],
  },
  {
    title: 'Contracts',
    boldHeader: true,
    notifications: [
      {
        id: 'contract-1',
        type: 'info',
        message: 'OBA Name: Contract ends in 3 days',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '7h ago',
        showOBAButton: true,
      },
      {
        id: 'contract-2',
        type: 'info',
        message: 'OBA Name: Contract starts tomorrow',
        linkText: 'View Details',
        linkUrl: '#',
        timeAgo: '7h ago',
        showOBAButton: true,
      },
    ],
  },
]
