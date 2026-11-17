import React from 'react'
import AntdForm from 'antd/es/form'
import { Grid } from '../..'
import type { FormFieldProps, FormItemProps, FormProps } from './Form.d'

export enum FormFields {
  'Button',
  'DatePicker',
  'Input',
  'InputNumber',
  'Select',
}

export const Form = function <T>({ children, ...props }: FormProps<T>) {
  return <AntdForm {...props}>{children}</AntdForm>
}

export const FormItem = function <T = any>({ colSpan, rules, children, ...props }: FormItemProps<T>) {
  const childTypeName = (children?.type as { name?: FormFields })?.name
  const isItemRdfFormField = childTypeName && Object.values(FormFields).includes(childTypeName)
  if (isItemRdfFormField) {
    const hasRequiredFormRule = rules?.find(rule => rule.required)
    const isFieldRequired = (children.props as FormFieldProps).required
    if (hasRequiredFormRule && !isFieldRequired) {
      children = React.cloneElement(children, { required: true } as FormFieldProps)
    } else if (!hasRequiredFormRule && isFieldRequired) {
      rules = [...(rules || []), { required: true }]
    }
  }

  const Wrapper = colSpan ? Grid.Col : React.Fragment

  return (
    <Wrapper {...(colSpan && { span: colSpan })}>
      <AntdForm.Item rules={rules} {...props} style={{ width: '100%', marginBottom: 0 }}>
        {children}
      </AntdForm.Item>
    </Wrapper>
  )
}

// Export Antd Form hooks
Form.useForm = AntdForm.useForm
Form.useFormInstance = AntdForm.useFormInstance
Form.useWatch = AntdForm.useWatch
FormItem.useStatus = AntdForm.Item.useStatus
// Export Antd Form components
Form.List = AntdForm.List
Form.ErrorList = AntdForm.ErrorList
Form.Provider = AntdForm.Provider
// Export Antd Form properties/helpers
Form.displayName = AntdForm.displayName
// Export customized components
Form.Item = FormItem
export default Form
