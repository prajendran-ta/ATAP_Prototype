export interface SectionLayoutProps {
  title: string
  titleStyle?: React.CSSProperties
  level?: 1 | 2 | 3 | 4 | 5 | undefined
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  children?: React.ReactNode
  link?: {
    enabled: boolean
    url: string
    title: string
  }
}
