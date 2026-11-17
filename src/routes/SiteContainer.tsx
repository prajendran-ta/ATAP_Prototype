import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Spinner } from '@amadeus/react-design-factory'
import { MainLayout } from '@mediahub/mediahub-ui/components/Layout'

// Every page behind the shell is code-split (React.lazy). Without a Suspense boundary, the first
// visit (chunks not yet cached, e.g. right after login) leaves the content area blank until the
// next navigation. The boundary shows a spinner inside the shell, then the page when it is ready.
const SiteContainer: React.FC = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export default SiteContainer
