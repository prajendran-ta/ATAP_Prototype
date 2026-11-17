import MediaplannerRoutes from './MediaplannerRoutes'
import MediaplannerGqlProvider from './MediaplannerGqlProvider'
const MediaplannerUi = () => {
  return (
      <MediaplannerGqlProvider>
        <MediaplannerRoutes />
      </MediaplannerGqlProvider>
  )
}

export default MediaplannerUi