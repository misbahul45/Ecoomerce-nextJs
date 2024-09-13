"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Props{
    routerType:string
}

const TypeMenu = ({ routerType }:Props) => {
  const [type, setType] = React.useState(routerType)
  const router=useRouter()
  
  React.useEffect(() => {
    router.push(`/create-post/${type.toLowerCase()}`)
  }, [type])
   
  console.log(type)

  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" className="capitalize font-semibold">{type}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Post Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                    <DropdownMenuRadioItem value="products">Products</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="poster">Poster</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="category">Category</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}


export default TypeMenu