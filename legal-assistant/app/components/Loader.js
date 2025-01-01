import React from 'react'
import Image from 'next/image'
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-16 my-12">
      <Image
      src="/images/lawyer.gif"
      height={128}
      width={128}
      alt='loader..'
      />
  </div>

  )
}

export default Loader