'use client'
import { getAllProduct } from '@/actions/products.actions'
import React from 'react'
import PostProduct from '../ui/PostProduct'
import Loader from '../ui/Loader'
import { Button } from '../ui/button'

const Wrapper = () => {
    const [products,setProducts]=React.useState<Product[]>([])
    const [page,setPage]=React.useState<number>(1)
    const [loading,setLoading]=React.useState(true)
    const [error,setError]=React.useState(false)

    React.useEffect(()=>{
        const getProducts=async()=>{  
            setLoading(true)
            try{
                const products=await getAllProduct(page) as Product[]
                setProducts(prev => [
                    ...prev, 
                    ...products.filter(product => !prev.some(p => p.id === product.id))
                ])
                setLoading(false)
            }
            catch(error){
                setError(true)
            }
        }
        getProducts()
    },[page]) 

  return (
    <>
      <h1 className='my-6 capitalize'>All Products</h1>
      {loading && <div className='w-full mt-12 h-full flex justify-center items-center gap-4'> 
            <Loader size="16" color="black"/>
        </div>}
      <div className='grid grid-cols-auto-fill gap-4'>
        {products?.map((product)=>(
          <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
        ))}
      </div>
      {products.length>0 && products.length%4===0 && <Button onClick={()=>products.length%4===0 && setPage(prev => prev + 1)} className='w-full my-6' variant={'outline'}>Load More</Button>}
    </>
  )
}

export default Wrapper
