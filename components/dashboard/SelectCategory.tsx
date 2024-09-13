import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const SelectCategory = () => {
  return (
    <Select>
        <SelectTrigger className="w-full my-4">
            <SelectValue placeholder="Parent Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default SelectCategory
