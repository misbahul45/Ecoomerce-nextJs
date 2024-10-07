import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props{
    comments:Comment[]
}

const Reviews = ({ comments }:Props) => {

  return (
    <div className='space-y-2 border-2 border-slate-300 rounded-lg'>
      {comments.map((comment)=>(
        <div key={comment.id} className='space-y-1 px-3 py-2'>
          <div className='flex gap-2 items-center'>
            <Avatar className='size-10 rounded-full shadow shadow-slate-700/20'>
              <AvatarImage src={comment.author?.image} alt="avatar" className='w-full h-full rounded-full object-cover' />
              <AvatarFallback><div className="w-full h-full rounded-full border-t-2 border-slate-700 animate-spin"></div></AvatarFallback>
            </Avatar>
            <div>
              <h2>{comment.author?.name}</h2>
              {Array.from({length: comment.rating.rating}).map((i,index)=>(
                <span key={index}>⭐</span>
              ))}
            </div>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Reviews
