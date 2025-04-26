import React from 'react'

const IconeBuilder = ({iconeHolder,bg='gray-500'}) => {
  return (
    <div className={`p-1 w-fit rounded-md bg-${bg}`}>
      {iconeHolder}
    </div>
  )
}

export default IconeBuilder
