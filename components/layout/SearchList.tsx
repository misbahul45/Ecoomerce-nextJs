'use client'

import React from "react"
import { SearchContext } from "./SearchProvider"
import FormSearch from "./FormSearch"

const SearchList = () => {
    const {showSearch}=React.useContext(SearchContext)

    React.useEffect(()=>{
        if(showSearch){
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    },[showSearch])
  return (
    <section className={`absolute left-1/2 top-2 -translate-x-1/2 ${showSearch?'scale-100':'scale-0'} lg:p-4 md:p-2 p-1.5 w-full max-w-xl z-30 bg-white/20 backdrop-blur-md shadow-xl shadow-slate-700/20 rounded-lg transition-all duration-100`} >
       <FormSearch />
    </section>
  )
}

export default SearchList
