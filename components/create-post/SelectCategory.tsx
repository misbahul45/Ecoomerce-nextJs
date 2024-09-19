import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


 interface Props{
  categories:Category[]
  dispatch:React.Dispatch<any>
  value:string
 }

const SelectCategory = ({ categories, dispatch, value }:Props) => {
 
  console.log(value)

  return (
    <>
      <p className="mt-4">
        <span className="relative pr-2">
          <span className='text-slate-500 font-semibold'>Category</span>
          <span className={` absolute right-0 top-0 ${value?'text-green-500':'text-red-600'}`}>*</span>
        </span>
      </p>
      <Select value={value} onValueChange={(value)=>dispatch({type:'SET_CATEGORY',payload:value})}> 
          <SelectTrigger className={`w-full mb-4 mt-2`}>
              <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className='backdrop-blur-md'>
            {categories.map((category)=>(
              <SelectItem key={category.id} value={category.id}><span className="capitalize">{category.category}</span></SelectItem>
            ))}
          </SelectContent>
      </Select>
    </>
  )
}

export default SelectCategory
