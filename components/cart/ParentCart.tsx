'use client'
import Image from "next/image"
import Information from "./Information"
import { Button } from "../ui/button"
import CartProduct from "./CartProduct"
import React from "react"

interface Props {
    cartOnProducts:any
}

const ParentCart = ({cartOnProducts}:Props) => {
  const [total, setTotal] = React.useState(0)

  

  return (
    <div>
      <Information total={total} cartOnProducts={cartOnProducts} />
      <div className="flex w-full">
        <div className="w-full space-y-3 px-4 py-3 mt-4 bg-slate-100 rounded-b-xl">
            {cartOnProducts.map((cartOnProduct:any) => (
              <CartProduct key={cartOnProduct.id} cartOnProduct={cartOnProduct} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ParentCart
