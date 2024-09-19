import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props{
  name:string,
  images:string[],
  slug:string
}

const PostProduct = ({  name, images, slug }: Props) => {
  return (
    <Link href={`/products/${slug}`} className='w-full px-6 py-4 rounded-lg shadow-xl shadow-slate-600/10 border-2 hover:shadow-slate-600/20'>
      <Image src={images[0]} alt={name} width={500} height={500} className='rounded-lg w-full object-cover shadow-xl shadow-slate-500/30' />
      <h1 className='mt-4 line-clamp-2 text-lg'>{name}</h1>
    </Link>
  );
};

export default PostProduct;
