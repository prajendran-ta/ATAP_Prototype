import React from 'react'
import AntdPagination from 'antd/es/pagination'
import { useTranslation } from 'react-i18next'

import { PaginationWrapper, PaginationLeft, PaginationCenter, PaginationRight } from './Pagination.styled'
import { CustomPaginationProps } from './Pagination.d'
import { Select } from '../Select'

const Pagination: React.FC<CustomPaginationProps> = ({
  current = 1,
  total = 0,
  pageSize = 10,
  onChange,
  pageSizeOptions = [10, 20, 50, 100],
  showSizeChanger = true,
  showTotal,
}) => {
  const { t } = useTranslation('design-system')
  const startItem = total === 0 ? 0 : (current - 1) * pageSize + 1
  const endItem = Math.min(current * pageSize, total)

  const handlePageSizeChange = (newSize: number) => {
    const nextPage = 1
    onChange?.(nextPage, newSize)
  }

  return (
    <PaginationWrapper>
      <PaginationLeft>
        {showTotal ? showTotal(total, [startItem, endItem]) : t('pagination.total', { startItem, endItem, total })}
      </PaginationLeft>

      <PaginationCenter>
        <AntdPagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={onChange}        
          showSizeChanger={false}
        />
      </PaginationCenter>

      {showSizeChanger && (
        <PaginationRight>
          <span>{t('pagination.itemsPerPage')}</span>
          <Select
            value={pageSize}
            showSearch={false}
            onChange={handlePageSizeChange}
            options={pageSizeOptions.map(size => ({
              value: size,
              label: size,
            }))}
          />
        </PaginationRight>
      )}
    </PaginationWrapper>
  )
}

export default Pagination
