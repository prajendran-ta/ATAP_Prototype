import React from 'react'
import ExcelJS from 'exceljs'
import { Button } from '@amadeus/react-design-factory'
import type { BudgetRow } from '../MediaplannerDownloadSummary.d'
import type { MonthColumn, OverviewRow } from '../helpers'

const sanitizeFileName = (value: string): string =>
  value
    .trim()
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

type DownloadExcelButtonProps = {
  overviewRows: OverviewRow[]
  monthColumns: MonthColumn[]
  dataSource: BudgetRow[]
  planName?: string | null
  id?: string
}

function DownloadExcelButton({
  overviewRows,
  monthColumns,
  dataSource,
  planName,
  id = 'mediaplan_summary_download-btn',
}: DownloadExcelButtonProps) {
  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Media Plan Summary')

    worksheet.columns = [
      { key: 'field', width: 28 },
      { key: 'value', width: 24 },
      ...monthColumns.map(col => ({ key: col.monthLabel, width: 16 })),
    ]

    overviewRows.forEach(({ label, value }) => {
      const row = worksheet.addRow({ field: label, value })
      row.getCell(1).font = { bold: true }
    })

    worksheet.addRow([])

    const tableHeaderRow = worksheet.addRow(['Platform-Tactic', 'Total', ...monthColumns.map(col => col.monthLabel)])
    tableHeaderRow.font = { bold: true }
    tableHeaderRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFEFEFEF' },
    }

    dataSource.forEach(row => {
      worksheet.addRow([row.channel, row.total, ...monthColumns.map(col => row[col.key] ?? '')])
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const safePlanName = sanitizeFileName(planName ?? 'media-plan') || 'media-plan'
    link.href = url
    link.download = `media-plan-${safePlanName}.xlsx`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button id={id} variant='solid' onClick={handleDownloadExcel}>
      Download CSV
    </Button>
  )
}

export default DownloadExcelButton