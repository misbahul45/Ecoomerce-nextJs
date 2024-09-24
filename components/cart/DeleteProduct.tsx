import React from 'react'
import { Button } from '../ui/button'
import { MdDelete } from 'react-icons/md'
import { deleteProductFromCart } from '@/actions/carts.actions'
import { useRouter } from 'next/navigation'
import { set } from 'zod'

interface Props {
    productId: string
    cartId: string
    setProductCheckout: React.Dispatch<React.SetStateAction<CartProduct[]>>
}

const DeleteProduct = ({productId, cartId, setProductCheckout}:Props) => {
    const router=useRouter()
    const handleDeleteProduct = async() => {
        setProductCheckout((prev) => prev.filter((product) => product.product['id'] !== productId))
        await deleteProductFromCart(cartId,productId)
    }

  return (
    <Button variant="destructive" onClick={handleDeleteProduct}>
      <MdDelete className='size-4' />
    </Button>
  )
}

export default DeleteProduct
