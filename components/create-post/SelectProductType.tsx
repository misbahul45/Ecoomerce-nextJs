import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props{
    dispatch:React.Dispatch<any>
    value:string
}

const SelectProductType = ({ dispatch, value }:Props) => {
  return (
    <Select value={value} onValueChange={(value)=>dispatch({type:'SET_TYPE',payload:value})}> 
        <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Product Type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="SELL">Sell</SelectItem>
            <SelectItem value="FEATURE">Feature</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default SelectProductType
