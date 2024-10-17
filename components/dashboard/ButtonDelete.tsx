'use client'

import { deleteUser } from "@/actions/users.action"
import { useRouter } from "next/navigation"
import { sleep } from "../create-post/FormProducts"
import Loader from "../ui/Loader"
import React from "react"
import { deleteProducts } from "@/actions/products.actions"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { deletePoster } from "@/actions/poster.actions"
import { deleteCategory } from "@/actions/category.actions"
import { deleteComment } from "@/actions/comments.actions"

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

    const handleDeletePoster=async(id:string)=>{
        setLoading(true)
        await sleep()
        await deletePoster(id)
        router.refresh()
        setLoading(false)
        toast({
            title:'Success',
            description:'Poster deleted successfully',
            variant:'default'
        })
    }

    const handleDeleteCategory=async(id:string)=>{
        setLoading(true)
        await sleep()
        await deleteCategory(id)
        router.refresh()
        setLoading(false)
        toast({
            title:'Success',
            description:'Category deleted successfully',
            variant:'default'
        })
    }

    const handleDeleteComment=async(id:string)=>{
        setLoading(true)
        await sleep()
        await deleteComment(id)
        router.refresh()
        setLoading(false)
        toast({
            title:'Success',
            description:'Comment deleted successfully',
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
        break;
        case "poster":
            handleDelete=()=>handleDeletePoster(id)
        break;
        case "categories":
            handleDelete=()=>handleDeleteCategory(id)
        break;
        case "comment":
            handleDelete=()=>handleDeleteComment(id)
        break;
    }
  return (
    <Button onClick={handleDelete} disabled={loading} variant={'destructive'}>
        {loading?<Loader size="4" color="white" />:"Delete"}
    </Button>
  )
}

export default ButtonDelete
