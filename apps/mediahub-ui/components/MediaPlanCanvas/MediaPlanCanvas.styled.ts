import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const TableWrap = styled.div`
  width: 100%;
  overflow: auto;
  border: 1px solid ${colors.cloud_30};
  border-radius: 6px;
  background: ${colors.cloud_0};
`

export const DataTable = styled.table`
  width: 100%;
  min-width: 1380px;
  border-collapse: separate;
  border-spacing: 0;
  color: ${colors.cloud_100};
  font-family: inherit;
  font-size: 12px;

  th,
  td {
    padding: 9px 10px;
    border-bottom: 1px solid ${colors.cloud_20};
    white-space: nowrap;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: ${colors.sky_10};
    color: ${colors.cloud_100};
    font-variant-numeric: proportional-nums;
    font-weight: 600;
    text-align: right;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  /* Keep the first two columns within the default side-panel width (~320px) so they
     are visible without horizontal scrolling; the first column wraps instead of forcing width. */
  th:first-child,
  td:first-child {
    min-width: 150px;
    max-width: 172px;
    white-space: normal;
  }

  th:nth-child(2),
  td:nth-child(2) {
    min-width: 92px;
    padding-right: 14px;
    text-align: right;
  }

  th:nth-child(n + 3),
  td:nth-child(n + 3) {
    min-width: 78px;
    text-align: right;
  }

  tbody tr:hover {
    background: ${colors.cloud_10};
  }

  tbody tr[data-row-kind='channel'] {
    background: ${colors.cloud_0};
    font-weight: 600;
  }

  tbody tr[data-row-kind='platform'] {
    background: ${colors.cloud_10};
    font-weight: 500;
  }

  tbody tr[data-row-kind='tactic'] {
    background: ${colors.cloud_20};
  }

  tbody tr[data-row-kind='fees'] {
    background: ${colors.cloud_10};
    font-weight: 500;
  }

  tbody tr[data-row-kind='spend-total'] {
    background: ${colors.cloud_10};
    font-weight: 500;
  }

  tbody tr[data-row-kind='total'] {
    background: ${colors.sky_10};
    color: ${colors.cloud_100};
    font-weight: 700;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`

export const HierarchyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${colors.sky_60};
    outline-offset: 2px;
  }

  &[data-depth='1'] {
    margin-left: 22px;
  }
`

export const HierarchyLabel = styled.span<{ $depth: 1 | 2 }>`
  display: inline-block;
  margin-left: ${({ $depth }) => `${$depth * 22}px`};
`

export const DisclosureIcon = styled.span<{ $expanded: boolean }>`
  display: inline-flex;
  flex: 0 0 12px;
  transform: rotate(${({ $expanded }) => ($expanded ? '0deg' : '-90deg')});
  transition: transform 120ms ease;
`
