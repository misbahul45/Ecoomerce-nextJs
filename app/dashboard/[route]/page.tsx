import ButtonDelete from '@/components/dashboard/ButtonDelete';
import ButtonStatus from '@/components/dashboard/ButtonStatus';
import ButtonUpdate from '@/components/dashboard/ButtonUpdate';
import { totalPrice } from '@/components/profile/ShowProfile';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { Avatar } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'


interface Props{
    params:{
        route:string
    }
}

export async function generateMetadata({ params: { route } }: Props) {
  return {
    title: `${route} - dashboard - Misbahul's Shop`,
    description: `${route} - dashboard for Misbahul's Shop`,
  }
}

const fetchData=async(route:string)=>{
  let data;
  switch(route){
    case 'users':
      data=await prisma.user.findMany({
        where:{
          role:'user'
        }
      })
    break;

    case 'products':
      data=await prisma.product.findMany({
        include:{
          category:true
        }
      })
    break;

    case'invoices':
      data=await prisma.order.findMany({
        include:{
          user:true,
          evidance:true,
          products:{
            include:{
              product:true,
            }
          }
        }
      })
    break;

    case 'other':
      data={
        categories:await prisma.category.findMany(),
        comments:await prisma.comment.findMany({
          include:{
            author:true,
            rating:true
          }
        }),
        posters:await prisma.poster.findMany()
      }
    break;
    default:  
      data=null;
    break;
  }
  return data
}

const page = async({ params: { route } }:Props) => {
    const data:any=await fetchData(route)
    let tableDisplay;

    if(route==='users'){
      tableDisplay=(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>image</TableHead>
              <TableHead>email</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user:any,index:any)=>(
              <TableRow key={user.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.image || ''} alt="avatar" className='size-9 rounded-full' />
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <ButtonDelete id={user.id} type={route} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }else if(route==='products'){
      tableDisplay=(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((product:any,index:any)=>(
              <TableRow key={product.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>
                  <Link href={'/products/'+product.slug} className='hover:border-b-2 hover:border-blue-500'>{product.name}</Link>
                </TableCell>
                <TableCell>{product.price.toLocaleString('id-ID',{style:'currency',currency:'IDR'})}</TableCell>
                <TableCell>{product.category.category}</TableCell>
                <TableCell>
                  <img src={product.images[0]} alt="product" className='w-10 h-10 rounded-full object-cover'/>
                </TableCell>
                <TableCell>
                  {product.type}
                </TableCell>
                <TableCell>
                  <ButtonDelete id={product.id} type={route} />
                </TableCell>
                <TableCell>
                  <ButtonUpdate id={product.id} type={route} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }else if(route==='invoices'){
      tableDisplay=(
        <Table>
          <TableCaption>A list of invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='min-w-64'>Locations</TableHead>
              <TableHead className='min-w-32'>Date</TableHead>
              <TableHead className='min-w-32'>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Methode</TableHead>
              <TableHead className='min-w-56'>Check</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((order:any,index:any)=>(
              <TableRow key={order.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString().replaceAll('/','-')}</TableCell>
                <TableCell>{totalPrice(order.products)}</TableCell>
                <TableCell className='flex items-center min-w-56 flex-wrap gap-2'>
                  <span className={`${order.status==='pending'?"text-yellow-600 bg-yellow-200":order.status==="delivery"?"bg-slate-200 text-slate-600":"bg-green-200 text-green-600"} px-2 py-1 rounded-full`}>
                    {order.status}
                  </span>
                  {order.status!=="paid" &&(
                    <ButtonStatus id={order.id} />
                  )}
                </TableCell>
                <TableCell className='uppercase font-semibold'>
                  <span className='text-slate-700 px-4 py-1 rounded-full bg-slate-200'>{order.methode}</span>
                </TableCell>
                <TableCell>
                  {order.status==='pending' || order.status==='delivered' ? (
                    <Button disabled={order.status==='paid' || !order.evidance} variant={'outline'} className='flex items-center gap-2'>
                      <Link href={`/products/order/${order.id}`}>
                        Check
                        {order.evidance && (<span className='p-1 bg-red-300 text-red-800 rounded-full'>!</span>)}
                      </Link>
                    </Button>
                  )
                  :
                  (
                    <span className='px-4 py-2 rounded-full bg-green-200 text-green-700'>Success</span>
                  )
                }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }else if(route==='other'){
      tableDisplay=(
        <div className='spce py-4'>
          <Table>
            <TableCaption>A list of Comments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {data?.comments.map((comment:any,index:any)=>(
                  <TableRow key={comment.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{comment.author.name}</TableCell>
                    <TableCell>{Array.from({ length: comment.rating.rating }).map((i, index) => (<span key={index} className='md:text-md text-sm'>⭐</span>))}</TableCell>
                    <TableCell>{comment.content}</TableCell>
                    <TableCell>
                      <ButtonDelete id={comment.id} type='comment' />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <br />
          <Table>
            <TableCaption>A list of Poster</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.posters.map((poster:any,index:any)=>(
                <TableRow key={poster.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>
                    <Image
                      src={poster.image}
                      alt={poster.title}
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell>
                    <ButtonDelete id={poster.id} type='poster'  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <br />

          <Table>
            <TableCaption>A list of Category</TableCaption>
            <TableHeader>
              <TableRow>  
                <TableHead>No</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.categories.map((category:any,index:any)=>(
                <TableRow key={category.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{category.category}</TableCell>
                  <TableCell>
                    <ButtonDelete id={category.id} type='categories' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }else{
      return notFound()
    }

  return (
    <div className='w-full lg:max-w-[85%] mx-auto'>
      {tableDisplay}
    </div>
  )
}


export default page
