import React from 'react'
import { ProfileDropdown } from './profileDropdown'

function StudioHeader() {
  return (
    <div className="p-6 border border-x-0 w-auto flex-1 flex justify-between">
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
