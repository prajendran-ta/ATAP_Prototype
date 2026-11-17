import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Table from './Table'

import { UserAddOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import Badge from '../Badge/Badge'
import { Link } from '@amadeus/react-design-factory'
import { colors } from '../../styles/colors'
import Checkbox from 'antd/es/checkbox'

const meta: Meta<typeof Table> = {
  title: 'Design Factory/Table',
  component: Table,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Table>

type Advertiser = {
  key: string
  check: boolean
  following: boolean
  name: string
  bpid: string
  type: string
  status: string
  mediaPlans: number
  followedBy: number
  ownedBy: string
  detailsUrl: string
}

const sampleData: Advertiser[] = [
  {
    key: '1',
    check: true,
    following: true,
    name: 'Hotel Sunshine',
    bpid: 'BP12345',
    type: 'Hotel',
    status: 'Active',
    mediaPlans: 3,
    followedBy: 5,
    ownedBy: 'Alice',
    detailsUrl: '/advertisers/1',
  },
  {
    key: '2',
    check: false,
    following: false,
    name: 'FlyAway Airlines',
    bpid: 'BP67890',
    type: 'Airline',
    status: 'Inactive',
    mediaPlans: 1,
    followedBy: 2,
    ownedBy: 'Bob',
    detailsUrl: '/advertisers/2',
  },
  {
    key: '3',
    check: true,
    following: true,
    name: 'Mountain Retreats',
    bpid: 'BP11223',
    type: 'Hotel',
    status: 'Active',
    mediaPlans: 2,
    followedBy: 3,
    ownedBy: 'Clara',
    detailsUrl: '/advertisers/3',
  },
  {
    key: '4',
    check: false,
    following: true,
    name: 'City Tourism Board',
    bpid: 'BP44556',
    type: 'DMO',
    status: 'Active',
    mediaPlans: 4,
    followedBy: 6,
    ownedBy: 'David',
    detailsUrl: '/advertisers/4',
  },
  {
    key: '5',
    check: true,
    following: false,
    name: 'Oceanic Airlines',
    bpid: 'BP77889',
    type: 'Airline',
    status: 'Inactive',
    mediaPlans: 1,
    followedBy: 1,
    ownedBy: 'Eva',
    detailsUrl: '/advertisers/5',
  },
  {
    key: '6',
    check: false,
    following: true,
    name: 'Global Travel Co.',
    bpid: 'BP99001',
    type: 'Agency',
    status: 'Active',
    mediaPlans: 5,
    followedBy: 8,
    ownedBy: 'Frank',
    detailsUrl: '/advertisers/6',
  },
  {
    key: '7',
    check: true,
    following: false,
    name: 'Beachside Resorts',
    bpid: 'BP22334',
    type: 'Hotel',
    status: 'Active',
    mediaPlans: 2,
    followedBy: 4,
    ownedBy: 'Grace',
    detailsUrl: '/advertisers/7',
  },
  {
    key: '8',
    check: false,
    following: false,
    name: 'National Parks Org',
    bpid: 'BP55667',
    type: 'DMO',
    status: 'Inactive',
    mediaPlans: 0,
    followedBy: 0,
    ownedBy: 'Henry',
    detailsUrl: '/advertisers/8',
  },
  {
    key: '9',
    check: true,
    following: true,
    name: 'Luxury Escapes',
    bpid: 'BP88990',
    type: 'Hotel',
    status: 'Active',
    mediaPlans: 6,
    followedBy: 10,
    ownedBy: 'Isabel',
    detailsUrl: '/advertisers/9',
  },
  {
    key: '10',
    check: false,
    following: true,
    name: 'Adventure Tours',
    bpid: 'BP33445',
    type: 'Agency',
    status: 'Active',
    mediaPlans: 3,
    followedBy: 7,
    ownedBy: 'Jack',
    detailsUrl: '/advertisers/10',
  },
]

// Checkbox selection state for Storybook preview
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const useSelection = (data: Advertiser[]) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const allRowKeys = data.map(row => row.key)
  const allChecked = selectedRowKeys.length === data.length && data.length > 0
  const indeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < data.length

  const handleHeaderCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(allRowKeys)
    } else {
      setSelectedRowKeys([])
    }
  }

  const handleRowCheckboxChange = (key: string) => (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(prev => [...prev, key])
    } else {
      setSelectedRowKeys(prev => prev.filter(k => k !== key))
    }
  }

  return { selectedRowKeys, handleHeaderCheckboxChange, handleRowCheckboxChange, allChecked, indeterminate }
}

import type { ColumnType } from 'antd/es/table'

const columns = (
  selection: ReturnType<typeof useSelection>,
  onToggleFollow: (key: string) => void,
): ColumnType<object>[] => [
  {
    title: (
      <Checkbox
        checked={selection.allChecked}
        indeterminate={selection.indeterminate}
        onChange={selection.handleHeaderCheckboxChange}
      />
    ),
    dataIndex: 'check',
    key: 'check',
    align: 'center',
    render: (_: boolean, record: any, index: number) => (
      <Checkbox
        checked={selection.selectedRowKeys.includes(record.key)}
        onChange={selection.handleRowCheckboxChange(record.key)}
      />
    ),
  },
  {
    title: 'Following',
    dataIndex: 'following',
    key: 'following',
    align: 'center',
    render: (isFollowing: boolean, record: any, index: number) => (
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => onToggleFollow(record.key)}
        title={isFollowing ? 'Unfollow' : 'Follow'}
      >
        {isFollowing ? (
          <UserAddOutlined style={{ color: colors.sky_60 }} />
        ) : (
          <UsergroupDeleteOutlined style={{ color: colors.cloud_80 }} />
        )}
      </span>
    ),
  },
  {
    title: 'Advertiser Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'BPID',
    dataIndex: 'bpid',
    key: 'bpid',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string, record: any, index: number) => {
      let color = colors.cloud_30
      if (status === 'Active') color = colors.forest_60
      else if (status === 'Inactive') color = colors.cloud_30
      return <Badge label={status} color={color} />
    },
  },
  {
    title: 'Media Plans',
    dataIndex: 'mediaPlans',
    key: 'mediaPlans',
  },
  {
    title: 'Followed By',
    dataIndex: 'followedBy',
    key: 'followedBy',
  },
  {
    title: 'Owned By',
    dataIndex: 'ownedBy',
    key: 'ownedBy',
  },
  {
    title: '',
    dataIndex: 'detailsUrl',
    key: 'details',
    render: (url: string, record: any, index: number) => (
      <Link id={url} key={url} href={url}>
        Details
      </Link>
    ),
  },
]

export const Default: Story = {
  render: args => {
    const [data, setData] = useState(sampleData)
    const selection = useSelection(data)

    const handleToggleFollow = (key: string) => {
      setData(prevData => prevData.map(row => (row.key === key ? { ...row, following: !row.following } : row)))
    }

    return (
      <Table
        {...args}
        cellsIdPrefix='storybook'
        dataSource={data}
        columns={columns(selection, handleToggleFollow)}
        pagination={{ pageSize: 10 }}
        rowKey='key'
      />
    )
  },
}
