'uae client'
import React from 'react'
import { SearchContext } from './SearchProvider'
interface Props {
    icon:JSX.Element
}

const SearchButton = ({icon}:Props) => {
    const { toggleSearch }=React.useContext(SearchContext)
    const search=()=>{
        toggleSearch()
    }
  return (
    <button onClick={search} className='rounded-full p-2 shadow shadow-slate-400/5 hover:bg-slate-100 transition-all duration-100'>
      {icon}
    </button>
  )
}

export default SearchButton
