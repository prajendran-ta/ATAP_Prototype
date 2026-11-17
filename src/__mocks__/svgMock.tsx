import React from 'react'

const SvgMock = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid='svg-mock' {...props} />

export { SvgMock as ReactComponent }
export default SvgMock
