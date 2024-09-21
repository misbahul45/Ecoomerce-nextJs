import React from 'react'

interface Props{
    size:'4'|'8'|'12'
    color:'white'|'black'
}

const Loader = ({ size, color }:Props) => {
  return (
    <div className={`border-t-2 animate-spin size-${size} rounded-full ${color==='white' ? 'border-white' : 'border-black'}`} />
  )
}

export default Loader
