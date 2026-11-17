import { colors } from '@amadeus/react-design-factory'
import styled from '@emotion/styled'
import { injectGlobal } from '@emotion/css'

export const TableOverflowWrapper = styled.div`
	overflow-x: auto;
`

export const OverviewLabel = styled.span`
	white-space: nowrap;
`

export const OverviewRow = styled.div`
	display: grid;
	grid-template-columns: 200px minmax(0, 1fr);
	column-gap: 20px;
	align-items: center;
	margin-bottom: 8px;
`

export const OverviewLabelCell = styled.div`
	min-width: 200px;
`

export const OverviewValueCell = styled.div`
	min-width: 0;
	overflow-wrap: anywhere;
`

export const DocHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: start;
	column-gap: 16px;
	margin-bottom: 24px;
`

export const DocEyebrow = styled.div`
	grid-column: 1;
	text-align: center;
	font-size: 13px;
	font-weight: 600;
	color: #2a5db0;
	margin-bottom: 4px;
`

export const DocTitle = styled.div`
	grid-column: 1;
	text-align: center;
	font-size: 22px;
	font-weight: 700;
	color: #1a1a1a;
`

export const DocBid = styled.div`
	grid-column: 2;
	justify-self: end;
	font-size: 13px;
	font-weight: 600;
	color: #555;
	white-space: nowrap;
`

export const DocTable = styled.div`
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	overflow: hidden;
	margin-bottom: 24px;
`

export const DocTableRow = styled.div`
	display: grid;
	grid-template-columns: minmax(220px, 40%) minmax(0, 1fr);
	border-bottom: 1px solid #ededed;

	&:last-of-type {
		border-bottom: none;
	}
`

export const DocTableLabel = styled.div`
	padding: 10px 14px;
	background: #fafafa;
	border-right: 1px solid #ededed;
	font-size: 14px;
`

export const DocTableValue = styled.div`
	padding: 10px 14px;
	font-size: 14px;
	overflow-wrap: anywhere;
`

export const StrategyBlock = styled.div`
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 24px;
`

export const StrategyTextArea = styled.textarea`
	width: 100%;
	min-height: 120px;
	resize: vertical;
	border: 1px solid #d9d9d9;
	border-radius: 6px;
	padding: 10px 12px;
	font: inherit;
	font-size: 14px;
	line-height: 1.5;
	color: #1a1a1a;
	background: #fff;

	&:focus {
		outline: none;
		border-color: #2a5db0;
		box-shadow: 0 0 0 2px rgba(42, 93, 176, 0.15);
	}

	&:disabled {
		background: #f5f5f5;
		color: #666;
	}
`

export const StrategyTitle = styled.div`
	font-weight: 700;
	font-size: 15px;
	margin-bottom: 8px;
`

export const StrategyTable = styled.div`
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	overflow: hidden;
	margin-bottom: 24px;
`

export const StrategyHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 200px 260px minmax(0, 1fr);
	background: #eef3fb;
	font-weight: 700;
	font-size: 13px;

	& > div {
		padding: 10px 14px;
		border-right: 1px solid #dfe6f2;
	}
	& > div:last-of-type {
		border-right: none;
	}
`

export const StrategyGroupRow = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	background: #f5f7fb;
	font-weight: 700;
	font-size: 13px;
	padding: 8px 14px;
	border-top: 1px solid #ededed;
`

export const StrategyDataRow = styled.div<{ disabled?: boolean }>`
	display: grid;
	grid-template-columns: 200px 260px minmax(0, 1fr);
	border-top: 1px solid #ededed;
	background: ${({ disabled }) => (disabled ? '#f2f2f2' : '#fff')};
	color: ${({ disabled }) => (disabled ? colors.cloud_50 : 'inherit')};

	& > div {
		padding: 10px 14px;
		border-right: 1px solid #ededed;
		font-size: 13px;
		background: ${({ disabled }) => (disabled ? '#f2f2f2' : '#fff')};
	}

	${({ disabled }) => disabled && `
		& span,
		& strong {
			color: ${colors.cloud_50} !important;
		}
	`}

	& > div:last-of-type {
		border-right: none;
	}
`

export const DocFooter = styled.div`
	text-align: center;
	font-size: 11px;
	color: #999;
	margin-top: 16px;
`


export const MonthlyTableWrap = styled.div`
	overflow-x: auto;

	/* Wrap cell text (esp. the first Media Initiative column) so the table fits the page. */
	table {
		table-layout: fixed;
		width: 100%;
	}
	th,
	td {
		white-space: normal !important;
		word-break: break-word;
		overflow-wrap: anywhere;
		vertical-align: top;
	}

	/* Category header rows — grey, centered, spanning the full width. */
	.mediaplan-monthly-category-header > td {
		background: ${colors.cloud_20} !important;
		font-weight: 600;
		text-align: center;
	}

	/* Seasonality + Total summary rows — blue. */
	.mediaplan-monthly-summary-row > td {
		background: ${colors.sky_10} !important;
	}
`


/**
 * Print / screen visibility helpers for the "Download PDF" flow.
 * The print layout (PrintOnly) is hidden on screen and revealed only when printing;
 * everything else (ScreenOnly + page chrome) is hidden during print. Each selected
 * tab renders inside a PrintPage that forces a page break.
 */
export const ScreenOnly = styled.div`
	@media print {
		display: none !important;
	}
`

export const PrintOnly = styled.div`
	display: none;

	@media print {
		display: block;
	}
`

export const PrintPage = styled.div`
	@media print {
		break-after: page;
		page-break-after: always;

		&:last-of-type {
			break-after: auto;
			page-break-after: auto;
		}
	}
`

export const PdfTabChoices = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 12px;
`

// During print, hide app chrome so only the PrintOnly layout is captured as pages.
void injectGlobal`
	@media print {
		#mediaplan_summary-breadcrumb-nav,
		#mediaplan_summary-stepper,
		#mediaplan_summary-ttl,
		.amadeus-layout-sider,
		.amadeus-layout-header,
		.amadeus-modal-root {
			display: none !important;
		}

		/* Sticky footer and any screen-only regions must not print. */
		[class*='StickyFooter'] {
			display: none !important;
		}
	}
`
