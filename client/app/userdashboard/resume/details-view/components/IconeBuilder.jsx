import React from 'react'

const IconeBuilder = ({ iconeHolder, bg = 'gray' }) => {
  return (
    <div
      style={{
        padding: '4px',
        width: 'fit-content',
        borderRadius: '6px',
        backgroundColor: bg,
      }}
    >
      {iconeHolder}
    </div>
  )
}

export default IconeBuilder
