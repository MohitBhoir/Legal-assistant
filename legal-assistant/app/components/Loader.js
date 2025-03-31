import React from 'react'
import Image from 'next/image'
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Image
        src="/images/hammer.gif"
        height={128}
        width={128}
        alt="Loading..."
      />
    </div>
  )
}

export default Loader