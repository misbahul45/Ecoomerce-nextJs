'use client'
import Image from 'next/image'
import React from 'react'

interface Props{
    images:string[]
}

const ProductImages = ({images}:Props) => {
  const [indexImage, setIndexImage]=React.useState(Math.floor(Math.random() *images.length))
  const [animateLeft, setAnimateLeft]=React.useState(false)
  React.useEffect(() => {
      setAnimateLeft(true)
  },[indexImage])

  React.useEffect(() => {
    setTimeout(() => {
      setAnimateLeft(false)
    }, 500)
  },[indexImage])

  return (
    <div className='space-y-5'>
      <div className='lg:h-[70vh] md:h-[50vh] lg:w-[50vw] h-[40vh] overflow-hidden'>
        <Image src={images[indexImage]} alt={images[indexImage]} width={500} height={500} className={`flex-1 lg:h-[70vh] md:h-[50vh] lg:w-[50vw] w-full h-[40vh] object-cover rounded-xl shadow-xl shadow-slate-800/20 ${animateLeft && 'animate-left'}`} />
      </div>
      <div className="gap-4 flex md:max-h-[70vh] md:max-w-[50vw] w-full overflow-auto no-scrollbar p-2">
        {images.map((image, index) => (
          <Image onClick={() => setIndexImage(index)} key={index} src={image} alt={image} width={100} height={100} className={`lg:size-16 md:size-14 size-8 mb-4 object-cover rounded shadow-lg shadow-slate-800/20 cursor-pointer hover:scale-110 transition-all duration-75 ${indexImage === index ? 'scale-110 shadow-xl shadow-black/30 border-blue-400 border-2' : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default ProductImages
