import ProductImages from '@/components/products/ProductImages'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
import AboutProduct from '@/components/products/AboutProduct'
import ProductDescription from '@/components/products/ProductDescription'
import { auth } from '@/lib/auth'
import FormReview from '@/components/products/FormReview'
import Products from '@/components/home/Products'
import PostProduct from '@/components/ui/PostProduct'


export async function generateMetadata({ params: { slug } }: Props) {
  const product=await prisma.product.findUnique({
    where:{
      slug
    }
  })
  return {
    title: product?.name,
    description:`${product?.name} - ${product?.description}`
  }
}

interface Props {
    params:{
        slug:string
    }  
} 


const page = async({ params: { slug } }: Props) => {
  const session=await auth()
  const user=session?await prisma.user.findUnique({
    where:{
      email:session?.user?.email as string
    }
  }) as User : null
  const product = (await prisma.product.findUnique({
    where: {
      slug
    },
    include: {
      comments: {
        include: {
          author: true,
          rating: true
        }
      }
    }
  })) as unknown as Product

  const categoryProduct=await prisma.category.findUnique({
    where:{
      id:product?.categoryId
    }
  }) as Category

  const releatedProducts=await prisma.product.findMany({
    where:{
      categoryId:categoryProduct.id,
      id:{
        not:product.id
      }
    },
    take:8
  }) as Product[]

  if(!product) return notFound()

  return (
    <section className='w-full pb-8 pt-2 px-4'>
      <div className='flex lg:flex-row flex-col gap-6 my-4'>
        <ProductImages images={product?.images as string[]} />
        {product?.type==='SELL' && <AboutProduct product={product} categoryProduct={categoryProduct} user={user}/>}
      </div>
      <br />
      <p className='text-2xl font-bold text-slate-800 mb-2'>Describe Product</p>
      <ProductDescription description={product?.description as string} />
      <Products title='Releated Products'>
          {releatedProducts.map((product:Product)=>(
              <PostProduct key={product.id} name={product.name} images={product.images} slug={product.slug} price={product.price} />
          ))}
      </Products>
      <FormReview productId={product.id} authorId={user?.id || null} comments={product?.comments} />
    </section>
  )
}

export default page
