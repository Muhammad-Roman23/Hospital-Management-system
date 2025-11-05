import React from 'react'

function Container({ children, bgColor, className = "" }) {
  return (
<div
      className={`px-4 sm:px-6 py-10 lg:px-20 md:px-6 mb-10 ${
        bgColor || 'bg-[#f0f7ff]'
        } ${className}`}
    >
      {children}
    </div>
  )
}

export default Container