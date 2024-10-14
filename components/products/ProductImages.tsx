'use client'
import Image from 'next/image'
import React from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel'

interface Props {
    type?: 'SELL' | 'FEATURE'
    images: string[]
}

const ProductImages = ({ images, type }: Props) => {
  const [indexImage, setIndexImage] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()


  return (
    <div className={`w-full flex-1 flex gap-4 ${type === 'FEATURE' ? 'flex-row' : 'flex-col'} justify-center items-center`}>
      <Carousel setApi={setApi} className='w-full'>
        {images.length > 0 ? (
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="relative w-full h-auto">
                  <Image src={image} alt={`Product image ${index + 1}`} width={500} height={500} className={`w-full md:h-[65vh] h-[40vh] object-cover shadow-xl shadow-slate-800/20 rounded-xl`} loading="lazy" />
                </div> 
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <div>No images available</div>
        )}
      </Carousel>
      <div className={`w-auto overflow-auto no-scrollbar p-2 ${type==='FEATURE'?"space-y-4":"flex items-center gap-4"}`}>
        {images.map((image, index) => (
          <Image
            onClick={() => {
              setIndexImage(index)
              if (api) api.scrollTo(index)
            }}
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            width={100}
            height={100}
            className={`lg:size-16 h-auto md:size-14 size-10 mb-4 object-cover rounded shadow-lg shadow-slate-800/20 cursor-pointer hover:scale-110 transition-all duration-75 ${indexImage === index ? 'scale-110 shadow-xl shadow-black/30 border-blue-400 border-2' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImages
