import Loader from '@/components/ui/Loader'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen grid place-items-center'>
      <Loader size="8" color='black' />
    </div>
  )
}

export default Loading
