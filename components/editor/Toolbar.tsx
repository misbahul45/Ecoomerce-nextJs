import React from 'react'

import { type Editor } from '@tiptap/react'
import { LuBold, LuStrikethrough, LuItalic, LuListOrdered, LuList,LuHeading2, LuUnderline, LuQuote, LuUndo, LuRedo, LuCode2 } from "react-icons/lu";

interface ToolbarProps {
    editor: Editor
}


const Toolbar = ({ editor }: ToolbarProps) => {
    if(!editor) return null
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex md:justify-start justify-center items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuBold className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuItalic className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuUnderline className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuStrikethrough className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuHeading2 className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuList className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuListOrdered className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <LuQuote className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <LuUndo className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <LuRedo className="lg:w-5 lg:h-5 w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export default Toolbar
