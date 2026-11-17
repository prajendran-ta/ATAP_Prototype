import type { ButtonProps as AntdButtonProps } from 'antd/es/button'

export interface ButtonProps
  extends Pick<
    AntdButtonProps,
    'id' | 'children' | 'disabled' | 'loading' | 'title' | 'size' | 'href' | 'htmlType' | 'onClick' | 'icon'
  > {
  variant?: Extract<AntdButtonProps['variant'], 'solid' | 'outlined' | 'text' | 'link'>
  color?: Extract<AntdButtonProps['color'], 'primary' | 'danger'>
}