'use client'
import React, { useEffect } from 'react'
import Tiptap from './Tiptap'

interface Props{
  dispacth:React.Dispatch<any>
}

const Editor = ({ dispacth }:Props) => {
    const [content, setContent]=React.useState<string>('')

    const handleContentChange: (value: string) => void = (value) => {
      setContent(value)
    }

    useEffect(() => {
      dispacth({type:'SET_DESCRIPTION',payload:content})
    }, [content])


  return (
    <div className='w-full flex justify-center items-center'>
      <Tiptap onChange={handleContentChange} />
    </div>
  )
}

export default Editor