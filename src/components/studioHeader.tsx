import React from 'react'
import { ProfileDropdown } from './profileDropdown'

function StudioHeader() {
  return (
    <div className="px-6 py-3 border border-x-0 border-zinc-700 border-t-0 w-auto flex-1 flex items-center justify-between">
      <div>
        <p className="text-white">Header</p>
      </div>
      <div>
        <p className="text-white">
          <ProfileDropdown />
        </p>
      </div>
    </div>
  )
}

export default StudioHeader
