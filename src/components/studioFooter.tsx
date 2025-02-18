import React from 'react'
import moment from 'moment'
function StudioFooter() {
  const year = moment().format('YYYY')
  return (
    <div className="fixed bg-zinc-900 bottom-0 w-full p-4 border border-x-0 border-b-0 border-t-zinc-700">
      <p className="text-white opacity-30 text-center text-xs  lg:translate-x-[-10%]">
        &copy; {year} All Rights Reserved
      </p>
    </div>
  )
}

export default StudioFooter
