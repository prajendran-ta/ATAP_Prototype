import React from 'react'
import type { FormProps as AntdFormProps, FormItemProps as AntdFormItemProps, RuleObject } from 'antd/es/form'

export interface FormProps<T> extends AntdFormProps<T> {
  children?: React.ReactNode
}

export interface FormItemProps<T> extends AntdFormItemProps<T> {
  rules?: RuleObject[]
  colSpan?: number
  children: React.ReactElement
}

export type FormFieldProps = { required: boolean }
