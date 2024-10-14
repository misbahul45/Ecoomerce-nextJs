'use client'
import React from 'react'
import { Button } from '../ui/button'
import { updateProducts } from '@/actions/products.actions'
import { useRouter } from 'next/navigation'
import { sleep } from '../create-post/FormProducts'
import Loader from '../ui/Loader'

interface Props {
    id:string
    type:string
}

const ButtonUpdate = ({id,type}:Props) => {
    const router=useRouter()
    const [loading,setLoading]=React.useState(false)
    const handleUpdateProduct = async() => {
        setLoading(true)
        await sleep()
        await updateProducts(id)
        router.refresh()
        setLoading(false)
    }
  return (
    <Button disabled={loading} onClick={handleUpdateProduct} variant={'outline'}>
      {loading?<Loader size="4" color="black" />:"Update"}
    </Button>
  )
}

export default ButtonUpdate
