import React from 'react'
import { CardRoot, CardHeader, CardBody } from './ModuleCard.styled'

export type ModuleCardProps = {
  Title: React.FC
  Content: React.FC
  onClick?: () => void
  className?: string
}

const ModuleCard: React.FC<ModuleCardProps> = ({ Title, Content, onClick, className }) => {
  return (
    <CardRoot className={className} onClick={onClick} role='group' tabIndex={0}>
      <CardHeader>
        <Title />
      </CardHeader>
      <CardBody>
        <Content />
      </CardBody>
    </CardRoot>
  )
}

export default ModuleCard
