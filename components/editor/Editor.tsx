'use client'
import React from 'react'
import Tiptap from './Tiptap'

const Editor = () => {
    const [content, setContent]=React.useState<string>('')
    const handleContentChange = (value: string) => {
      setContent(value)
    }
    console.log(content)
  return (
    <form className='w-full grid place-items-center pt-10'>
      <Tiptap onChange={handleContentChange} value={content} />
    </form>
  )
}

export default Editor
