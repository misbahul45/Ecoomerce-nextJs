'use client'
import Image from "next/image"
import Information from "./Information"
import { Button } from "../ui/button"
import CartProduct from "./CartProduct"

interface Props {
    cartOnProducts:any
}


const ParentCart = ({cartOnProducts}:Props) => {

  return (
    <div>
      <Information cartOnProducts={cartOnProducts} />
      <div className="flex gap-4">
        <div className="space-y-3 px-4 py-3 mt-4 bg-slate-100 rounded-b-xl">
            {cartOnProducts.map((cartOnProduct:any) => (
                <CartProduct key={cartOnProduct.id} cartOnProduct={cartOnProduct} />
            ))}
        </div>
        <div className="size-72"></div>
      </div>
    </div>
  )
}

export default ParentCart
