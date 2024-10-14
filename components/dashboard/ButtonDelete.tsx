'use client'

import { deleteUser } from "@/actions/users.action"
import { useRouter } from "next/navigation"
import { sleep } from "../create-post/FormProducts"
import Loader from "../ui/Loader"
import React from "react"
import { deleteProducts } from "@/actions/products.actions"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"

interface Props {
    id:string
    type:string
}
const ButtonDelete = ({id,type}:Props) => {
    const router=useRouter()
    const [loading,setLoading]=React.useState(false)
    const { toast }=useToast()


    const handleDeleteUser=async(id:string)=>{
        setLoading(true)
        await sleep()
        await deleteUser(id)
        router.refresh()
        setLoading(false)
        toast({
            title:'Success',
            description:'User deleted successfully',
            variant:'default'
        })
    }

    const handleDeleteProduct=async()=>{
        setLoading(true)
        await sleep()
        await deleteProducts(id)
        router.refresh()
        setLoading(false)
        toast({
            title:'Success',
            description:'Product deleted successfully',
            variant:'default'
        })
    }

    let handleDelete;

    switch(type){
        case "users":
            handleDelete=()=>handleDeleteUser(id)
        break;
        case "products":
            handleDelete=()=>handleDeleteProduct()
    }
  return (
    <Button onClick={handleDelete} disabled={loading} variant={'destructive'}>
        {loading?<Loader size="4" color="white" />:"Delete"}
    </Button>
  )
}

export default ButtonDelete
