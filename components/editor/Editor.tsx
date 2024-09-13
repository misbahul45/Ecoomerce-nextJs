'use client'
import React from 'react'
import Tiptap from './Tiptap'

const Editor = () => {
    const [content, setContent]=React.useState<string>('')

    const handleContentChange: (value: string) => void = (value) => {
      setContent(value)
    }

  return (
    <div className='w-full grid place-items-center'>
      <Tiptap onChange={handleContentChange} />
    </div>
  )
}

export default Editor