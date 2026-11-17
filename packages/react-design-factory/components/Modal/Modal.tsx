import React, { FC } from 'react'
import type { ModalProps } from './Modal.d'
import * as Styled from './Modal.styled'

const Modal: FC<ModalProps> = ({
  title,
  open,
  closable,
  onOk,
  onCancel,
  okText,
  cancelText,
  idPrefix,
  confirmLoading,
  children,
  width,
  centered,
  maskStyle,
  footer,
}) => {
  return (
    <Styled.Modal
      title={title}
      open={open}
      okText={okText}
      onOk={onOk}
      cancelText={cancelText}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      width={width}
      centered={centered}
      maskStyle={maskStyle}
      closable={closable}
      footer={footer}
      {...(idPrefix && {
        okButtonProps: { id: `${idPrefix}-ok-btn` },
        cancelButtonProps: { id: `${idPrefix}-cancel-btn` },
      })}
    >
      {children}
    </Styled.Modal>
  )
}

export default Modal
