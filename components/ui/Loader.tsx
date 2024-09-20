import React from 'react'

interface Props{
    size:'4'|'8'|'12'
}

const Loader = ({size}:Props) => {
  return (
    <div className={`border-t-2 border-slate-200 animate-spin size-${size}`} />
  )
}

export default Loader
