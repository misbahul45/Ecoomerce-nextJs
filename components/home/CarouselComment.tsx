import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'

const CarouselComment = ({ comments }: { comments: any }) => {
  const renderImages = (comments: any) => (
    comments.map((comment: any) => (
      <div key={comment.id} className="mx-2 max-w-sm space-y-4 px-4 py-2 rounded-lg shadow-lg shadow-slate-500/20 bg-white/5 text-slate-700 opacity-70 hover:scale-105 hover:opacity-100 transition-all duration-100">
        <div className="flex items-center gap-4">
          <Image
            src={comment.author.image}
            alt={`Image of author ${comment.author.name} for comment ${comment.id}`}
            width={80}
            height={80}
            className="lg:size-20 md:size-16 size-12 object-cover rounded-full shadow-xl shadow-slate-800/20"
            loading="lazy"
          />
          <div className="lg:space-y-2 space-y-1">
            <p className='md:text-lg text-md font-semibold'>{comment.author.name}</p>
            <div className="flex gap-2 items-center">
              {Array.from({ length: comment.rating.rating }).map((i, index) => (
                <span key={index} className='md:text-md text-sm'>⭐</span>
              ))}
            </div>
          </div>
        </div>
        <p>{comment.content}</p>
      </div>
    ))
  );

  return (
    <div className="w-full flex justify-center">
      <Marquee gradient={false} pauseOnHover={true} className="w-full py-6 [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]">
        {renderImages(comments)}
      </Marquee>
    </div>
  );
}

export default CarouselComment;
