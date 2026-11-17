import type { ModalProps as AntModalProps } from 'antd/es/modal'

/**
 * Modal component props - extends Ant Design Modal
 * @see https://ant.design/components/modal
 */

export interface ModalProps extends Pick<
  AntModalProps,
  | 'title'
  | 'open'
  | 'onOk'
  | 'onCancel'
  | 'footer'
  | 'closable'
  | 'okText'
  | 'cancelText'
  | 'confirmLoading'
  | 'width'
  | 'centered'
  | 'maskStyle'
  | 'children'
> {
  idPrefix?: string
}
