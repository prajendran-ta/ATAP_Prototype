import React from 'react'
import { IconButton, Spinner } from '@amadeus/react-design-factory'
import { closeCampaignWorkspace, useCampaignFlowState } from '../CampaignFlow/campaignFlowStore'
import * as Canvas from '../CampaignCreationCanvas/CampaignCreationCanvas.styled'
import { MediaPlanAllocationTable } from './MediaPlanAllocationTable'

const MediaPlanCanvas: React.FC = () => {
  const { aiWorkspaceTitle, aiWorkspaceLoading } = useCampaignFlowState()

  return (
    <Canvas.Canvas data-testid='media-plan-canvas' data-media-plan-canvas='true' data-campaign-canvas='true'>
      <Canvas.CanvasInner>
        <Canvas.CanvasHeader>
          <Canvas.CanvasTitle>{aiWorkspaceTitle}</Canvas.CanvasTitle>
          <Canvas.CanvasHeaderActions>
            <IconButton
              iconName='xmark'
              color='currentColor'
              width={14}
              height={14}
              title='Close media plan canvas'
              onClick={closeCampaignWorkspace}
            />
          </Canvas.CanvasHeaderActions>
        </Canvas.CanvasHeader>

        {aiWorkspaceLoading ? (
          <Canvas.LoadingState role='status'>
            <Spinner />
            Preparing media plan…
          </Canvas.LoadingState>
        ) : (
          <MediaPlanAllocationTable />
        )}
      </Canvas.CanvasInner>
    </Canvas.Canvas>
  )
}

export default MediaPlanCanvas
