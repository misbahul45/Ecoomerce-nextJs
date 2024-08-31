import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
import { Underline } from '@tiptap/extension-underline'

interface TiptapProps {
  value: string
  onChange: (value: string) => void
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps:{
      attributes:{
        class:"flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none"
      }     
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    immediatelyRender:false
  })

  return(
    <div className='w-full'>
      {editor&&(
        <>
           <Toolbar editor={editor} content={value} />
           <EditorContent style={{ whiteSpace:'balance' }} editor={editor} />
        </>
      )}
    </div>
  )
}

export default Tiptap
