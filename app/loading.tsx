import Loader from '@/components/ui/Loader'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen grid place-items-center'>
      <div className="flex gap-4">
        <Loader size="16" color='black' />
        <p>Loading.....</p>
      </div>
    </div>
  )
}

export default Loading
