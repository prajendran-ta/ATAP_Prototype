import React, { forwardRef, useImperativeHandle } from 'react'
import { useTableFilters } from './useTableFilters'
import type { TableWithFilterBannerProps } from './TableWithFilterBanner.d'
import type { FilterValue as AntdFilterValue } from 'antd/es/table/interface'
import FilterHeaderControls from './FilterHeaderControls/FilterHeaderControls'
import FilterBanner from './FilterBanner/FilterBanner'
import { Container, Pagination, Table, Text } from '@amadeus/react-design-factory'

function TableWithFilterBannerInner<T extends Record<string, any>>(
  {
    id,
    cellsIdPrefix,
    rowKey,
    columns,
    tableLayout,
    initialFilters = {} as any,
    pageSize = 10,
    filterMode = 'client',
    queryFn,
    filterItems,
    showTags = true,
    showClearAll = true,
    showFilterBanner = true,
    sectionTitle,
    tableTitle,
    tableTitleContent,
    titleButtons,
    summaryContent,
    tableSearch,
    tableCustomControls,
    searchAdornment,
    tableScrollX,
    bannerFooter,
    belowControls,
    rowClassName,
    rowSelection,
    clientSideFilters = [],
    tableWarning = {
      show: false,
      component: null,
    },
  }: TableWithFilterBannerProps<T>,
  ref: React.Ref<any>,
): React.ReactElement {
  const {
    data: filteredData,
    loading,
    pagination,
    onTableChange,
    setFilters,
    filters,
    removeFilter,
    handleClearAll,
    columns: transformedColumns,
    headerFilters,
    bannerFilters,
    refetchWithFilters,
  } = useTableFilters<T>({
    columns,
    pageSize,
    filterMode,
    queryFn,
    serverDebounceMs: 500,
    filterItems,
    initialFilters,
    clientSideFilters,
    tableSearch,
  })
  const moduleId = id.replace('-tbl', '')
  // Exposed values for parent components using ref
  useImperativeHandle(ref, () => ({
    currentPage: pagination?.current ?? 1,
    totalPages: pagination?.total ? Math.ceil(pagination.total / (pagination.pageSize ?? pageSize)) : 1,
    selectedRows: rowSelection?.selectedRowKeys ?? [],
    refetchWithFilters: refetchWithFilters,
  }))

  return (
    <>
      {(!!sectionTitle || !!titleButtons) && (
        <Container.Header>
          {!!sectionTitle && <Text.H3 id={`${moduleId}-ttl`}>{sectionTitle}</Text.H3>}
          {titleButtons}
        </Container.Header>
      )}

      {!!summaryContent && summaryContent}

      {showFilterBanner && (
        <FilterBanner<T>
          filters={bannerFilters}
          values={filters}
          setValue={(name, value) => setFilters({ ...filters, [name]: value })}
          removeFilter={removeFilter}
          handleClearAll={handleClearAll}
          showTags={showTags}
          showClearAll={showClearAll}
          clearBtnId={`${moduleId}-clear_all-btn`}
          bannerFooter={bannerFooter}
        />
      )}

      <Container.Section>
        <Text.H5 id={`${moduleId}-table-ttl`}>{tableTitle}</Text.H5>
        {tableTitleContent}

        <FilterHeaderControls
          searchId={`${moduleId}-search-inp`}
          headerFilters={headerFilters}
          values={filters}
          setValue={(name, value) => setFilters({ ...filters, [name]: value })}
          tableSearch={tableSearch}
          tableCustomControls={tableCustomControls}
          searchAdornment={searchAdornment}
        />

        {belowControls}

        {tableWarning.show ? (
          tableWarning.component
        ) : (
          <React.Fragment>
            <Table<T>
              id={id}
              cellsIdPrefix={cellsIdPrefix}
              rowKey={rowKey}
              columns={transformedColumns}
              dataSource={filteredData}
              onChange={onTableChange}
              loading={loading}
              rowSelection={rowSelection}
              rowClassName={rowClassName}
              pagination={false}
              scroll={tableScrollX ? { x: tableScrollX } : undefined}
              {...(tableLayout ? { tableLayout } : {})}
            />

            <Pagination
              current={pagination?.current}
              pageSize={pagination?.pageSize || 10}
              total={pagination?.total}
              showTotal={(total, [_, endItem]) => `${endItem} of ${total} items`}
              onChange={(page, pageSize) => {
                onTableChange?.(
                  {
                    current: page,
                    pageSize,
                  },
                  filters as Record<string, AntdFilterValue | null>,
                  null,
                )
              }}
              showSizeChanger
            />
          </React.Fragment>
        )}
      </Container.Section>
    </>
  )
}

const TableWithFilterBanner = forwardRef(
  <T extends Record<string, any>>(props: TableWithFilterBannerProps<T>, ref: React.Ref<any>) =>
    TableWithFilterBannerInner<T>(props, ref),
) as <T extends Record<string, any>>(
  props: TableWithFilterBannerProps<T> & { ref?: React.Ref<any> },
) => React.ReactElement

export default TableWithFilterBanner
