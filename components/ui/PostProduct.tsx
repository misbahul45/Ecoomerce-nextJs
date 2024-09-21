'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

interface Props{
  name:string,
  images:string[],
  slug:string,
  price:number
}

const PostProduct = ({  name, images, slug, price }: Props) => {
  const [indexImgae, setIndexImage] = React.useState(Math.floor(Math.random() *images.length) )
  const [animate, setAnimate] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (indexImgae < images.length - 1) {
        setIndexImage(indexImgae + 1)
      } else {
        setIndexImage(0)
      }
      setAnimate(true)
    }, Math.round(10000))
    return () => {
      clearInterval(interval)
    }
  }, [indexImgae])

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false)
      }, 1000)
    }
  }, [animate])

  return (
    <Link href={`/products/${slug}`} className='w-full px-3 py-2 rounded-xl shadow-md shadow-slate-600/10 border-2 hover:shadow-slate-600/40 transition-all duration-100 group'>
      <Image src={images[indexImgae]} alt={name} width={500} height={500} className={`rounded-lg lg:w-64 h-48 w-full object-cover shadow-xl shadow-slate-500/30 group-hover:scale-105 transition-all duration-100 ${animate && "animate-1-pulse"}`} />
      <h2 className='mt-4 line-clamp-2'>{name}</h2>
      <p className='font-semibold'>{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
    </Link>
  );
};

export default PostProduct;
