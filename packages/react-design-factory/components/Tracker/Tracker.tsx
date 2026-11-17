import React, { FC, useRef } from 'react'
import type { TrackerProps } from './Tracker.d'
import * as Styled from './Tracker.styled'

const Tracker: FC<TrackerProps> = ({ progressPercent = 0, thresholdPercent, thresholdLabel, startLabel, endLabel }) => {
  const thresholdLabelRef = useRef<HTMLDivElement>(null)
  const offsetHeight = thresholdLabelRef.current?.offsetHeight ?? 0
  const offsetWidth = thresholdLabelRef.current?.offsetWidth ?? 0

  // Ensure percentages are within 0-100 range
  thresholdPercent =
    Number(thresholdPercent) < 0 || (thresholdPercent && isNaN(thresholdPercent)) ? 0 : thresholdPercent
  progressPercent = Number(progressPercent) < 0 || isNaN(progressPercent) ? 0 : progressPercent

  return (
    <Styled.TrackerContainer offsetHeight={offsetHeight} offsetWidth={offsetWidth}>
      <Styled.TrackerBase progressPercent={progressPercent} thresholdPercent={thresholdPercent}>
        <Styled.ProgressBar progressPercent={progressPercent ?? 0} />
        {typeof thresholdPercent === 'number' && <Styled.Threshold thresholdPercent={thresholdPercent} />}
        {thresholdLabel && (
          <Styled.ThresholdLabel
            ref={thresholdLabelRef}
            thresholdPercent={thresholdPercent ?? 50}
            offsetWidth={offsetWidth}
          >
            {thresholdLabel}
          </Styled.ThresholdLabel>
        )}
      </Styled.TrackerBase>

      <Styled.TrackerFooter>
        {(startLabel || endLabel) && (
          <Styled.LabelContainer align='flex-start'>{startLabel ?? ' '}</Styled.LabelContainer>
        )}
        {endLabel && <Styled.LabelContainer align='flex-end'>{endLabel}</Styled.LabelContainer>}
      </Styled.TrackerFooter>
    </Styled.TrackerContainer>
  )
}

export default Tracker
