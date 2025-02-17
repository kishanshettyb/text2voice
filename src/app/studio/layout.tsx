import StudioFooter from '@/components/studioFooter'
import StudioHeader from '@/components/studioHeader'
import StudioSidebar from '@/components/studioSidebar'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="flex bg-zinc-900 h-screen">
      <div className="hidden lg:w-1/6 bg-zinc-800 lg:flex h-100">
        <StudioSidebar />
      </div>
      <div className="w-full   lg:w-5/6 h-100">
        <div>
          <StudioHeader />
          {children}
          <StudioFooter />
        </div>
      </div>
    </div>
  )
}

export default Layout
