/**
 * Prototype-only query criteria for the Audience Rules detail page.
 * Between different criteria rows the combination is AND; the values selected
 * within a single row (multi-select) are combined with OR.
 */
export type CriteriaType =
  | 'ORIGIN'
  | 'DESTINATION'
  | 'ENGAGEMENT_ACTIVITY'
  | 'NUMBER_OF_PASSENGERS'
  | 'DURATION_OF_STAY'

export const CRITERIA_TYPE_OPTIONS: { label: string; value: CriteriaType }[] = [
  { label: 'Origin', value: 'ORIGIN' },
  { label: 'Destination', value: 'DESTINATION' },
  { label: 'Engagement Activity', value: 'ENGAGEMENT_ACTIVITY' },
  { label: 'Number of Passengers', value: 'NUMBER_OF_PASSENGERS' },
  { label: 'Duration of Stay', value: 'DURATION_OF_STAY' },
]

export const CRITERIA_TYPE_LABEL: Record<CriteriaType, string> = Object.fromEntries(
  CRITERIA_TYPE_OPTIONS.map(o => [o.value, o.label]),
) as Record<CriteriaType, string>

export const getCriteriaTypeLabel = (type: CriteriaType, travelIntentCategory?: string): string => {
  if (travelIntentCategory === 'AIRLINE' && type === 'ORIGIN') return 'Origin IATA'
  if (travelIntentCategory === 'AIRLINE' && type === 'DESTINATION') return 'Destination IATA'
  return CRITERIA_TYPE_LABEL[type]
}

/** Criteria types whose value is picked from a place tree (continent -> country -> city). */
export const PLACE_CRITERIA_TYPES: CriteriaType[] = ['ORIGIN', 'DESTINATION']
/** Criteria types compared against a single number with an operator. */
export const NUMBER_CRITERIA_TYPES: CriteriaType[] = ['NUMBER_OF_PASSENGERS', 'DURATION_OF_STAY']

export const ENGAGEMENT_ACTIVITY_OPTIONS = [
  { label: 'Visited', value: 'VISITED' },
  { label: 'Abandoned Carts', value: 'ABANDONED_CARTS' },
  { label: 'Searched', value: 'SEARCHED' },
  { label: 'Booked', value: 'BOOKED' },
]

export const NUMBER_OPERATOR_OPTIONS = [
  { label: 'Greater than or equal', value: 'GTE' },
  { label: 'Less than or equal', value: 'LTE' },
  { label: 'Equals', value: 'EQ' },
]

export interface PlaceTreeNode {
  title: string
  value: string
  children?: PlaceTreeNode[]
}

/**
 * Continent -> country -> city tree for the Origin/Destination pickers. Country coverage
 * follows the region groupings used by Google's GeoChart (see
 * https://developers.google.com/chart/interactive/docs/gallery/geochart) for a near-complete
 * list of sovereign states per continent; a handful of major countries also include cities.
 */
export const PLACE_TREE_OPTIONS: PlaceTreeNode[] = [
  {
    title: 'Africa',
    value: 'AFRICA',
    children: [
      { title: 'Algeria', value: 'ALGERIA' },
      { title: 'Angola', value: 'ANGOLA' },
      { title: 'Benin', value: 'BENIN' },
      { title: 'Botswana', value: 'BOTSWANA' },
      { title: 'Burkina Faso', value: 'BURKINA_FASO' },
      { title: 'Burundi', value: 'BURUNDI' },
      { title: 'Cabo Verde', value: 'CABO_VERDE' },
      { title: 'Cameroon', value: 'CAMEROON' },
      { title: 'Central African Republic', value: 'CENTRAL_AFRICAN_REPUBLIC' },
      { title: 'Chad', value: 'CHAD' },
      { title: 'Comoros', value: 'COMOROS' },
      { title: 'Congo', value: 'CONGO' },
      { title: 'DR Congo', value: 'DR_CONGO' },
      { title: 'Djibouti', value: 'DJIBOUTI' },
      {
        title: 'Egypt',
        value: 'EGYPT',
        children: [
          { title: 'Cairo', value: 'CAIRO' },
          { title: 'Alexandria', value: 'ALEXANDRIA' },
        ],
      },
      { title: 'Equatorial Guinea', value: 'EQUATORIAL_GUINEA' },
      { title: 'Eritrea', value: 'ERITREA' },
      { title: 'Eswatini', value: 'ESWATINI' },
      { title: 'Ethiopia', value: 'ETHIOPIA' },
      { title: 'Gabon', value: 'GABON' },
      { title: 'Gambia', value: 'GAMBIA' },
      { title: 'Ghana', value: 'GHANA' },
      { title: 'Guinea', value: 'GUINEA' },
      { title: 'Guinea-Bissau', value: 'GUINEA_BISSAU' },
      { title: 'Ivory Coast', value: 'IVORY_COAST' },
      { title: 'Kenya', value: 'KENYA' },
      { title: 'Lesotho', value: 'LESOTHO' },
      { title: 'Liberia', value: 'LIBERIA' },
      { title: 'Libya', value: 'LIBYA' },
      { title: 'Madagascar', value: 'MADAGASCAR' },
      { title: 'Malawi', value: 'MALAWI' },
      { title: 'Mali', value: 'MALI' },
      { title: 'Mauritania', value: 'MAURITANIA' },
      { title: 'Mauritius', value: 'MAURITIUS' },
      { title: 'Morocco', value: 'MOROCCO' },
      { title: 'Mozambique', value: 'MOZAMBIQUE' },
      { title: 'Namibia', value: 'NAMIBIA' },
      { title: 'Niger', value: 'NIGER' },
      { title: 'Nigeria', value: 'NIGERIA' },
      { title: 'Rwanda', value: 'RWANDA' },
      { title: 'Sao Tome and Principe', value: 'SAO_TOME_AND_PRINCIPE' },
      { title: 'Senegal', value: 'SENEGAL' },
      { title: 'Seychelles', value: 'SEYCHELLES' },
      { title: 'Sierra Leone', value: 'SIERRA_LEONE' },
      { title: 'Somalia', value: 'SOMALIA' },
      { title: 'South Africa', value: 'SOUTH_AFRICA' },
      { title: 'South Sudan', value: 'SOUTH_SUDAN' },
      { title: 'Sudan', value: 'SUDAN' },
      { title: 'Tanzania', value: 'TANZANIA' },
      { title: 'Togo', value: 'TOGO' },
      { title: 'Tunisia', value: 'TUNISIA' },
      { title: 'Uganda', value: 'UGANDA' },
      { title: 'Zambia', value: 'ZAMBIA' },
      { title: 'Zimbabwe', value: 'ZIMBABWE' },
    ],
  },
  {
    title: 'Asia',
    value: 'ASIA',
    children: [
      { title: 'Afghanistan', value: 'AFGHANISTAN' },
      { title: 'Armenia', value: 'ARMENIA' },
      { title: 'Azerbaijan', value: 'AZERBAIJAN' },
      { title: 'Bahrain', value: 'BAHRAIN' },
      { title: 'Bangladesh', value: 'BANGLADESH' },
      { title: 'Bhutan', value: 'BHUTAN' },
      { title: 'Brunei', value: 'BRUNEI' },
      { title: 'Cambodia', value: 'CAMBODIA' },
      {
        title: 'China',
        value: 'CHINA',
        children: [
          { title: 'Beijing', value: 'BEIJING' },
          { title: 'Shanghai', value: 'SHANGHAI' },
        ],
      },
      { title: 'Cyprus', value: 'CYPRUS' },
      { title: 'Georgia', value: 'GEORGIA' },
      {
        title: 'India',
        value: 'INDIA',
        children: [
          { title: 'New Delhi', value: 'NEW_DELHI' },
          { title: 'Mumbai', value: 'MUMBAI' },
        ],
      },
      {
        title: 'Indonesia',
        value: 'INDONESIA',
        children: [
          { title: 'Jakarta', value: 'JAKARTA' },
          { title: 'Bali', value: 'BALI' },
        ],
      },
      { title: 'Iran', value: 'IRAN' },
      { title: 'Iraq', value: 'IRAQ' },
      { title: 'Israel', value: 'ISRAEL' },
      {
        title: 'Japan',
        value: 'JAPAN',
        children: [
          { title: 'Tokyo', value: 'TOKYO' },
          { title: 'Osaka', value: 'OSAKA' },
        ],
      },
      { title: 'Jordan', value: 'JORDAN' },
      { title: 'Kazakhstan', value: 'KAZAKHSTAN' },
      { title: 'Kuwait', value: 'KUWAIT' },
      { title: 'Kyrgyzstan', value: 'KYRGYZSTAN' },
      { title: 'Laos', value: 'LAOS' },
      { title: 'Lebanon', value: 'LEBANON' },
      { title: 'Malaysia', value: 'MALAYSIA' },
      { title: 'Maldives', value: 'MALDIVES' },
      { title: 'Mongolia', value: 'MONGOLIA' },
      { title: 'Myanmar', value: 'MYANMAR' },
      { title: 'Nepal', value: 'NEPAL' },
      { title: 'North Korea', value: 'NORTH_KOREA' },
      { title: 'Oman', value: 'OMAN' },
      { title: 'Pakistan', value: 'PAKISTAN' },
      { title: 'Palestine', value: 'PALESTINE' },
      { title: 'Philippines', value: 'PHILIPPINES' },
      { title: 'Qatar', value: 'QATAR' },
      { title: 'Saudi Arabia', value: 'SAUDI_ARABIA' },

      { title: 'Singapore', value: 'SINGAPORE' },
      { title: 'South Korea', value: 'SOUTH_KOREA' },
      { title: 'Sri Lanka', value: 'SRI_LANKA' },
      { title: 'Syria', value: 'SYRIA' },
      { title: 'Taiwan', value: 'TAIWAN' },
      { title: 'Tajikistan', value: 'TAJIKISTAN' },
      {
        title: 'Thailand',
        value: 'THAILAND',
        children: [
          { title: 'Phuket', value: 'PHUKET' },
        ],
      },
      { title: 'Timor-Leste', value: 'TIMOR_LESTE' },
      { title: 'Turkey', value: 'TURKEY' },
      { title: 'Turkmenistan', value: 'TURKMENISTAN' },
      { title: 'United Arab Emirates', value: 'UNITED_ARAB_EMIRATES' },
      { title: 'Uzbekistan', value: 'UZBEKISTAN' },
      { title: 'Vietnam', value: 'VIETNAM' },
      { title: 'Yemen', value: 'YEMEN' },
    ],
  },
  {
    title: 'Europe',
    value: 'EUROPE',
    children: [
      { title: 'Albania', value: 'ALBANIA' },
      { title: 'Andorra', value: 'ANDORRA' },
      { title: 'Austria', value: 'AUSTRIA' },
      { title: 'Belarus', value: 'BELARUS' },
      { title: 'Belgium', value: 'BELGIUM' },
      { title: 'Bosnia and Herzegovina', value: 'BOSNIA_AND_HERZEGOVINA' },
      { title: 'Bulgaria', value: 'BULGARIA' },
      { title: 'Croatia', value: 'CROATIA' },
      { title: 'Czech Republic', value: 'CZECH_REPUBLIC' },
      { title: 'Denmark', value: 'DENMARK' },
      { title: 'Estonia', value: 'ESTONIA' },
      { title: 'Finland', value: 'FINLAND' },
      {
        title: 'France',
        value: 'FRANCE',
        children: [
          { title: 'Paris', value: 'PARIS' },
          { title: 'Nice', value: 'NICE' },
        ],
      },
      {
        title: 'Germany',
        value: 'GERMANY',
        children: [
          { title: 'Berlin', value: 'BERLIN' },
          { title: 'Munich', value: 'MUNICH' },
          { title: 'Frankfurt', value: 'FRANKFURT' },
        ],
      },
      { title: 'Greece', value: 'GREECE' },
      { title: 'Hungary', value: 'HUNGARY' },
      { title: 'Iceland', value: 'ICELAND' },
      { title: 'Ireland', value: 'IRELAND' },
      { title: 'Italy', value: 'ITALY' },
      { title: 'Kosovo', value: 'KOSOVO' },
      { title: 'Latvia', value: 'LATVIA' },
      { title: 'Liechtenstein', value: 'LIECHTENSTEIN' },
      { title: 'Lithuania', value: 'LITHUANIA' },
      { title: 'Luxembourg', value: 'LUXEMBOURG' },
      { title: 'Malta', value: 'MALTA' },
      { title: 'Moldova', value: 'MOLDOVA' },
      { title: 'Monaco', value: 'MONACO' },
      { title: 'Montenegro', value: 'MONTENEGRO' },
      { title: 'Netherlands', value: 'NETHERLANDS' },
      { title: 'North Macedonia', value: 'NORTH_MACEDONIA' },
      { title: 'Norway', value: 'NORWAY' },
      { title: 'Poland', value: 'POLAND' },
      { title: 'Portugal', value: 'PORTUGAL' },
      { title: 'Romania', value: 'ROMANIA' },
      { title: 'Russia', value: 'RUSSIA' },
      { title: 'San Marino', value: 'SAN_MARINO' },
      { title: 'Serbia', value: 'SERBIA' },
      { title: 'Slovakia', value: 'SLOVAKIA' },
      { title: 'Slovenia', value: 'SLOVENIA' },
      {
        title: 'Spain',
        value: 'SPAIN',
        children: [
          { title: 'Madrid', value: 'MADRID' },
          { title: 'Barcelona', value: 'BARCELONA' },
        ],
      },
      { title: 'Sweden', value: 'SWEDEN' },
      { title: 'Switzerland', value: 'SWITZERLAND' },
      { title: 'Ukraine', value: 'UKRAINE' },
      {
        title: 'United Kingdom',
        value: 'UNITED_KINGDOM',
        children: [
          { title: 'London', value: 'LONDON' },
          { title: 'Manchester', value: 'MANCHESTER' },
        ],
      },
      { title: 'Vatican City', value: 'VATICAN_CITY' },
    ],
  },
  {
    title: 'North America',
    value: 'NORTH_AMERICA',
    children: [
      { title: 'Antigua and Barbuda', value: 'ANTIGUA_AND_BARBUDA' },
      { title: 'Bahamas', value: 'BAHAMAS' },
      { title: 'Barbados', value: 'BARBADOS' },
      { title: 'Belize', value: 'BELIZE' },
      {
        title: 'Canada',
        value: 'CANADA',
        children: [
          { title: 'Toronto', value: 'TORONTO' },
          { title: 'Vancouver', value: 'VANCOUVER' },
        ],
      },
      { title: 'Costa Rica', value: 'COSTA_RICA' },
      { title: 'Cuba', value: 'CUBA' },
      { title: 'Dominica', value: 'DOMINICA' },
      { title: 'Dominican Republic', value: 'DOMINICAN_REPUBLIC' },
      { title: 'El Salvador', value: 'EL_SALVADOR' },
      { title: 'Grenada', value: 'GRENADA' },
      { title: 'Guatemala', value: 'GUATEMALA' },
      { title: 'Haiti', value: 'HAITI' },
      { title: 'Honduras', value: 'HONDURAS' },
      { title: 'Jamaica', value: 'JAMAICA' },
      {
        title: 'Mexico',
        value: 'MEXICO',
        children: [
          { title: 'Mexico City', value: 'MEXICO_CITY' },
          { title: 'Cancun', value: 'CANCUN' },
        ],
      },
      { title: 'Nicaragua', value: 'NICARAGUA' },
      { title: 'Panama', value: 'PANAMA' },
      { title: 'Saint Kitts and Nevis', value: 'SAINT_KITTS_AND_NEVIS' },
      { title: 'Saint Lucia', value: 'SAINT_LUCIA' },
      { title: 'Saint Vincent and the Grenadines', value: 'SAINT_VINCENT_AND_THE_GRENADINES' },
      { title: 'Trinidad and Tobago', value: 'TRINIDAD_AND_TOBAGO' },
      {
        title: 'United States',
        value: 'UNITED_STATES',
        children: [
          { title: 'New York', value: 'NEW_YORK' },
          { title: 'Los Angeles', value: 'LOS_ANGELES' },
          { title: 'Miami', value: 'MIAMI' },
        ],
      },
    ],
  },
  {
    title: 'South America',
    value: 'SOUTH_AMERICA',
    children: [
      { title: 'Argentina', value: 'ARGENTINA' },
      { title: 'Bolivia', value: 'BOLIVIA' },
      {
        title: 'Brazil',
        value: 'BRAZIL',
        children: [
          { title: 'Rio de Janeiro', value: 'RIO_DE_JANEIRO' },
          { title: 'Sao Paulo', value: 'SAO_PAULO' },
        ],
      },
      { title: 'Chile', value: 'CHILE' },
      { title: 'Colombia', value: 'COLOMBIA' },
      { title: 'Ecuador', value: 'ECUADOR' },
      { title: 'Guyana', value: 'GUYANA' },
      { title: 'Paraguay', value: 'PARAGUAY' },
      { title: 'Peru', value: 'PERU' },
      { title: 'Suriname', value: 'SURINAME' },
      { title: 'Uruguay', value: 'URUGUAY' },
      { title: 'Venezuela', value: 'VENEZUELA' },
    ],
  },
  {
    title: 'Oceania',
    value: 'OCEANIA',
    children: [
      {
        title: 'Australia',
        value: 'AUSTRALIA',
        children: [
          { title: 'Sydney', value: 'SYDNEY' },
          { title: 'Melbourne', value: 'MELBOURNE' },
        ],
      },
      { title: 'Fiji', value: 'FIJI' },
      { title: 'Kiribati', value: 'KIRIBATI' },
      { title: 'Marshall Islands', value: 'MARSHALL_ISLANDS' },
      { title: 'Micronesia', value: 'MICRONESIA' },
      { title: 'Nauru', value: 'NAURU' },
      { title: 'New Zealand', value: 'NEW_ZEALAND' },
      { title: 'Palau', value: 'PALAU' },
      { title: 'Papua New Guinea', value: 'PAPUA_NEW_GUINEA' },
      { title: 'Samoa', value: 'SAMOA' },
      { title: 'Solomon Islands', value: 'SOLOMON_ISLANDS' },
      { title: 'Tonga', value: 'TONGA' },
      { title: 'Tuvalu', value: 'TUVALU' },
      { title: 'Vanuatu', value: 'VANUATU' },
    ],
  },
]

const createFakeIataCode = (value: string): string => {
  const letters = value.replace(/[^A-Z]/gi, '').toUpperCase()
  const hash = letters.split('').reduce((total, letter) => total + letter.charCodeAt(0), 0)
  return Array.from({ length: 3 }, (_, index) => String.fromCharCode(65 + ((hash + index * 11) % 26))).join('')
}

const addFakeIataNodes = (nodes: PlaceTreeNode[], depth = 0): PlaceTreeNode[] => nodes.map(node => {
  const children = node.children ? addFakeIataNodes(node.children, depth + 1) : undefined
  if (depth !== 1) return { ...node, ...(children ? { children } : {}) }

  const code = createFakeIataCode(node.value)
  return {
    ...node,
    children: [
      ...(children ?? []),
      { title: `${node.title} (IATA: ${code})`, value: `${node.value}_IATA_${code}` },
    ],
  }
})

export const PLACE_TREE_OPTIONS_WITH_IATA: PlaceTreeNode[] = addFakeIataNodes(PLACE_TREE_OPTIONS)

export interface CriteriaRow {
  id: string
  type: CriteriaType
  /** Selected place/activity values for tree or multi-select criteria (OR'd together). */
  values: string[]
  operator?: string
  numberValue?: number
}

export const createEmptyCriteriaRow = (id: string): CriteriaRow => ({
  id,
  type: 'ORIGIN',
  values: [],
})

const ENGAGEMENT_ACTIVITY_LABEL: Record<string, string> = Object.fromEntries(
  ENGAGEMENT_ACTIVITY_OPTIONS.map(o => [o.value, o.label]),
)

const NUMBER_OPERATOR_LABEL: Record<string, string> = Object.fromEntries(
  NUMBER_OPERATOR_OPTIONS.map(o => [o.value, o.label]),
)

/** Looks up a place node's display title by value, searching the whole continent/country/city tree. */
export const getPlaceLabel = (value: string): string => {
  const search = (nodes: PlaceTreeNode[]): string | undefined => {
    for (const node of nodes) {
      if (node.value === value) return node.title
      const found = node.children && search(node.children)
      if (found) return found
    }
    return undefined
  }
  return search(PLACE_TREE_OPTIONS_WITH_IATA) ?? value
}

/** Full breadcrumb path (e.g. ["Europe", "Austria"]) from continent down to the given node. */
export const getPlacePath = (value: string): string[] => {
  const search = (nodes: PlaceTreeNode[], path: string[]): string[] | undefined => {
    for (const node of nodes) {
      const nextPath = [...path, node.title]
      if (node.value === value) return nextPath
      const found = node.children && search(node.children, nextPath)
      if (found) return found
    }
    return undefined
  }
  return search(PLACE_TREE_OPTIONS_WITH_IATA, []) ?? [value]
}

/** Deterministic mock audience-size count for a place, purely for prototype visualisation. */
export const getPlaceMockCount = (value: string): number => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return (Math.abs(hash) % 4990) + 10
}

export interface PlaceSelectionNode {
  value: string
  title: string
  /** Selected descendants that were auto-checked because this node itself is selected. */
  children: PlaceSelectionNode[]
}

/**
 * Groups selected place values into a collapsed tree: only the highest selected ancestor of
 * each branch becomes a top-level row (e.g. selecting the "Africa" continent collapses all
 * of its auto-selected countries under one "Africa" row that can be expanded).
 */
export const buildPlaceSelectionTree = (selectedValues: string[]): PlaceSelectionNode[] => {
  const selected = new Set(selectedValues)

  const build = (nodes: PlaceTreeNode[]): PlaceSelectionNode[] => {
    const result: PlaceSelectionNode[] = []
    nodes.forEach(node => {
      const isSelected = selected.has(node.value)
      const children = node.children ? build(node.children) : []
      if (isSelected || children.length > 0) {
        result.push({ value: node.value, title: node.title, children })
      }
    })
    return result
  }

  return build(PLACE_TREE_OPTIONS_WITH_IATA)
}

/**
 * Re-adds any ancestor whose subtree still has at least one selected descendant. antd's
 * TreeSelect auto-uncheck a parent as soon as one child becomes unchecked (e.g. removing one
 * country from a fully-selected continent also drops the continent from the value array) —
 * this keeps the remaining selections grouped under that continent/country instead of falling
 * back to a flat, ungrouped list.
 */
export const reconcileSelectedPlaceValues = (values: string[]): string[] => {
  const selected = new Set(values)

  const visit = (nodes: PlaceTreeNode[]): boolean => {
    let anySelectedInBranch = false
    nodes.forEach(node => {
      const childHasSelection = node.children ? visit(node.children) : false
      if (selected.has(node.value) || childHasSelection) {
        selected.add(node.value)
        anySelectedInBranch = true
      }
    })
    return anySelectedInBranch
  }

  visit(PLACE_TREE_OPTIONS_WITH_IATA)
  return Array.from(selected)
}

/**
 * Prunes the continent/country/city tree down to only the branches containing a selected
 * value (plus their ancestors), so the selection can be visualised as a small tree instead
 * of a flat list of chips.
 */
export const pruneTreeToSelection = (nodes: PlaceTreeNode[], selectedValues: string[]): PlaceTreeNode[] => {
  const selected = new Set(selectedValues)
  const prune = (list: PlaceTreeNode[]): PlaceTreeNode[] =>
    list.reduce<PlaceTreeNode[]>((acc, node) => {
      const prunedChildren = node.children ? prune(node.children) : []
      if (selected.has(node.value) || prunedChildren.length > 0) {
        acc.push({ ...node, ...(prunedChildren.length > 0 ? { children: prunedChildren } : {}) })
      }
      return acc
    }, [])
  return prune(nodes)
}

/** Structured, chip-friendly summary of a criteria row; used by the Rule Summary sidebar. */
export interface CriteriaRowSummary {
  typeLabel: string
  /** Resolved chip labels for place/engagement rows (OR'd together); undefined for number rows. */
  chips?: string[]
  /** Plain-text summary for number rows, e.g. "Number of Passengers < 4". */
  text?: string
}

/** Structured summary for chip-based rendering; returns undefined for incomplete rows. */
export const summarizeCriteriaRow = (row: CriteriaRow, travelIntentCategory?: string): CriteriaRowSummary | undefined => {
  const typeLabel = getCriteriaTypeLabel(row.type, travelIntentCategory)

  if (PLACE_CRITERIA_TYPES.includes(row.type)) {
    if (row.values.length === 0) return undefined
    return { typeLabel, chips: row.values.map(getPlaceLabel) }
  }

  if (row.type === 'ENGAGEMENT_ACTIVITY') {
    if (row.values.length === 0) return undefined
    return { typeLabel, chips: row.values.map(v => ENGAGEMENT_ACTIVITY_LABEL[v] ?? v) }
  }

  if (NUMBER_CRITERIA_TYPES.includes(row.type)) {
    if (!row.operator || row.numberValue == null) return undefined
    return { typeLabel, text: `${NUMBER_OPERATOR_LABEL[row.operator] ?? row.operator} ${row.numberValue}` }
  }

  return undefined
}

export const summarizeCriteriaRows = (rows: CriteriaRow[], travelIntentCategory?: string): CriteriaRowSummary[] =>
  rows.map(row => summarizeCriteriaRow(row, travelIntentCategory)).filter((s): s is CriteriaRowSummary => Boolean(s))

