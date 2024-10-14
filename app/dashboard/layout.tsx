import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

const layout = ({ children }:{ children: React.ReactNode}) => {
  return (
    <section className='w-full'>
      <Sidebar />
      {children}
    </section>
  )
}

export default layout
