import type { BreadcrumbProps as AntBreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb'

export interface BreadcrumbProps extends Pick<AntBreadcrumbProps, 'items' | 'separator'> {
  defaultHome?: boolean
}
