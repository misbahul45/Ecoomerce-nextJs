'use client'
import Image from 'next/image'
import React from 'react'

interface Props{
    images:string[]
}

const ProductImages = ({images}:Props) => {
  const [indexImgae, setIndexImage]=React.useState(Math.floor(Math.random() *images.length))

  return (
    <div className='space-y-5'>
      <div className='lg:h-[70vh] md:h-[60vh] md:w-[50vw] w-full h-[40vh]s'>
        <Image src={images[indexImgae]} alt={images[indexImgae]} width={500} height={500} className='flex-1 lg:h-[70vh] md:h-[60vh] md:w-[50vw] w-full h-[40vh] object-cover rounded-xl shadow-xl shadow-slate-800/20' />
      </div>
      <div className="gap-4 flex md:max-h-[70vh] md:max-w-[50vw] w-full overflow-auto no-scrollbar">
        {images.map((image, index) => (
          <Image onClick={() => setIndexImage(index)} key={index} src={image} alt={image} width={100} height={100} className={`lg:size-16 md:size-14 size-8 mb-4 object-cover rounded shadow-lg shadow-slate-800/20 cursor-pointer hover:scale-110 transition-all duration-75 ${indexImgae === index ? 'scale-110 shadow-xl shadow-black/30' : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default ProductImages
