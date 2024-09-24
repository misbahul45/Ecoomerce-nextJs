'use client'
import Information from "./Information"
import CartProduct from "./CartProduct"
import React from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { createProductOrder } from "@/actions/order.actions"
import { useRouter } from "next/navigation"
import { sleep } from "../create-post/FormProducts"
import Loader from "../ui/Loader"

interface Props {
    cartOnProducts:CartOnProduct[],
    userId:string
}


const ParentCart = ({cartOnProducts, userId}:Props) => {
  const [total, setTotal] = React.useState(0)
  const [productChechout, setProductCheckout] = React.useState<CartProduct[]>([])
  const [loading, setLoading] = React.useState(false)

  const router=useRouter()


  React.useEffect(() => {
    setTotal(productChechout.reduce((prev,curr)=>prev+curr.quantity * curr.product.price,0))
  },[productChechout, cartOnProducts])

  const handleCheckout = async() => {
    setLoading(true)
    const order=await createProductOrder(userId, productChechout)
    sleep()
    setProductCheckout([])
    setTotal(0)
    setLoading(false)
    if(order){
      router.push(`/checkout/${order.id}`)
    }
  }

  return (
      <div>
        <Information productChechout={productChechout} setProductCheckout={setProductCheckout} total={total} cartOnProducts={cartOnProducts} />
        <div className="flex w-full">
          <div className="w-full space-y-3 px-4 py-3 mt-4 bg-slate-100 rounded-b-xl">
              {cartOnProducts.map((cartOnProduct:any) => (
                <CartProduct key={cartOnProduct.id} cartProduct={cartOnProduct} productChechout={productChechout} setProductCheckout={setProductCheckout} />
              ))}

              {cartOnProducts.length === 0 && (
                <div className="w-full h-56 flex justify-center items-center">
                  <Image src="/cart.svg" alt="empty-cart" width={200} height={200} />
                  <div className="spce-y-3">
                    <h1>Wow, your shopping cart is empty</h1>
                    <p>Come on, fill it with dream items!</p>
                    <Link href={'/store'}><Button className="bg-blue-600 hover:bg-blue-700 font-semibold">Start shopping</Button></Link> 
                  </div>
                </div>
                )}
          </div>
        </div>
        <Button onClick={handleCheckout} disabled={loading || productChechout.length===0} variant="default" className="w-full mt-4 flex justify-center gap-4 items-center">
          {loading ? <>
            <Loader size="4" color="white" />
            <span>Ordering...</span>
          </> : "Checkout"}
        </Button>
      </div>
  )
}

export default ParentCart
