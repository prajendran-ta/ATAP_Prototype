import type { SwitchProps } from 'antd/es/switch'

export interface ToggleProps
  extends Pick<
    SwitchProps,
    | 'id'
    | 'checked'
    | 'defaultChecked'
    | 'disabled'
    | 'loading'
    | 'size'
    | 'onChange'
    | 'onClick'
    | 'checkedChildren'
    | 'unCheckedChildren'
    | 'autoFocus'
    | 'title'
  > {
}