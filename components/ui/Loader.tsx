import React from 'react'

interface Props{
    size:'4'|'8'|'16'
    color:'white'|'black'
}

const Loader = ({ size, color }:Props) => {
  return (
    <div className={`${size==="16"?"border-t-4":"border-t-2"} animate-spin size-${size} rounded-full ${color==='white' ? 'border-white' : 'border-black'}`} />
  )
}

export default Loader
