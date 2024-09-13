'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { SearchContext } from './SearchProvider'
import { IoCloseSharp } from "react-icons/io5";

const FormSearch = () => {
  const {toggleSearch}=React.useContext(SearchContext) 

  return (
    <form className='w-full relative flex gap-1'>
     <div className="relative flex-1">
        <Input placeholder='Type any product' className='peer' />
        <Search className='absolute right-2 top-1/2 -translate-y-1/2 opacity-40 peer-focus:opacity-100' />
     </div>
     <button onClick={toggleSearch} type='button' className='size-10 rounded-full shadow-lg shadow-black/5 hover:bg-slate-500/10 grid place-items-center'>
        <IoCloseSharp size={20} />
     </button>
    </form>
  )
}

export default FormSearch
