import ProductImages from '@/components/products/ProductImages'
import prisma from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import AboutProduct from '@/components/products/AboutProduct'
import ProductDescription from '@/components/products/ProductDescription'
import { auth } from '@/lib/auth'
import FormReview from '@/components/products/FormReview'
import Products from '@/components/home/Products'
import PostProduct from '@/components/ui/PostProduct'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'


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
        },
        orderBy:{
          rating:{
            rating: 'desc'
          }
        }
      }
    }
  })) as unknown as Product

  if (!product) {
    return <>
      <section className='w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center'>
        <p className='text-xl font-semibold text-blue-800/60'>404</p>
        <h1 className='text-4xl font-bold'>Poduct Not Found</h1>
        <div className="flex gap-4 mt-8">
          <Link href={'/store'} className='px-6 py-2.5 bg-blue-600 text-slate-100 font-semibold rounded hover:bg-blue-700 '>Go To Products</Link>
          <Link href={'/profile/show'} className='flex gap-1 items-center px-6 py-2.5 font-semibold rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all duration-100 group'>
              <span>Go To Profile</span>
              <FaArrowRight size={15} className='group-hover:translate-x-2 transition-all duration-100' />
          </Link>
        </div>
      </section>
    </>
  }

  const categoryProduct=(product?await prisma.category.findUnique({
    where:{
      id:product?.categoryId
    }
  }) : [] ) as Category

  const releatedProducts=categoryProduct?await prisma.product.findMany({
    where:{
      categoryId:categoryProduct.id,
      id:{
        not:product.id
      }
    },
    take:8
  }) as Product[] :[]

  return (
    <section className='w-full pb-8 pt-2 px-4'>
      <div className='flex lg:flex-row flex-col gap-6 my-4'>
        <ProductImages images={product?.images as string[]} type={product?.type as "FEATURE" | "SELL"} />
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
      <FormReview user={user} productId={product.id} authorId={user?.id || null} comments={product?.comments || []} />
    </section>
  )
}

export default page
