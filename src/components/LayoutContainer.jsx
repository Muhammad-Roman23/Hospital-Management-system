import React from 'react'

function Container({children}) {
  return (
    <div className="px-4 sm:px-6 py-10 lg:px-20 md:px-6  bg-[#f0f7ff]">
        {children}
    </div>
  )
}

export default Container