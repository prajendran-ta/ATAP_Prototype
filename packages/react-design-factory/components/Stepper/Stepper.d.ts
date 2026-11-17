import { StepsProps as AntdStepsProps, StepProps as AntdStepProps } from 'antd/es/steps'

export interface StepperProps extends Pick<AntdStepsProps, 'items' | 'current' | 'status' | 'onChange'> {
  id?: string
  fullWidth?: boolean
}
