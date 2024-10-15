'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface Props {
  name: string,
  images: string[],
  slug: string,
  price: number
}

const PostProduct = ({ name, images, slug, price }: Props) => {
  const [indexImage, setIndexImage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndexImage((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <Link href={`/products/${slug}`} className='w-full px-3 py-2 rounded-xl shadow-md shadow-slate-600/10 border-2 hover:shadow-slate-600/40 transition-all duration-100 group'>
      <div className='lg:w-60 h-48 w-full relative'>
        <Avatar className='shadow-xl shadow-slate-600/20 w-full h-full rounded-md'>
          <AvatarImage
            src={images[indexImage]}
            alt={name}
            width={500}
            height={500}
            className={`w-full h-full object-cover shadow-xl shadow-slate-500/30 group-hover:scale-105 transition-all duration-100`} 
          />
          <AvatarFallback className='rounded-md'>
            <div className="w-full h-full bg-gradient-to-r from-slate-50/20 via-slate-100 to-gray-400 animated-background"></div>
          </AvatarFallback>
        </Avatar>
      </div>
      <h2 className='mt-4 line-clamp-2'>{name}</h2>
      <p className='font-semibold'>{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
    </Link>
  );
};

export default PostProduct;
