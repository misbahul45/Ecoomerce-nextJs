import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props{
    name:string,
    price:number,
    slug:string,
    id:string
    toggleSearch:() => void
    images:string[],
    categoryId:string,
    categories:Category[]
}

const ProductList = ({ categoryId, categories,images,name, price, slug, id, toggleSearch }:Props) => {
    const categoryProducts=categories.find((category)=>category.id===categoryId)
  return (
    <Link onClick={()=>toggleSearch()} href={'/products/'+slug} key={id+''} className="flex gap-2 hover:bg-slate-200 cursor-pointer p-2 rounded-lg">
        <Image src={images[0]} width={120} height={120} alt={name} className="size-32 rounded-lg object-cover shadow-xl shadow-slate-700/40" />
        <div>
            <p>{name}</p>
            <button className='font-bold lg:my-4 my-2 text-sm bg-slate-200 shadow-xl shadow-black/20 px-3 py-1 rounded '>{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</button>
            <p>{categoryProducts?.category}</p>
        </div>
    </Link>
  )
}

export default ProductList
