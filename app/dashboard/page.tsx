import { getAllLength, getAllValuesByMonth } from '@/actions/dashboard.action'
import Chart from '@/components/dashboard/Chart'
import { Metadata } from 'next'
import React from 'react'
import { FaMoneyCheckAlt, FaRegImages, FaRegWindowRestore } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { LiaCommentSolid } from 'react-icons/lia'
import { MdCategory } from 'react-icons/md'

const ICON={
  "User":<HiUsers size={18} />,
  "Product":<FaRegWindowRestore size={18} />,
  "Category":<MdCategory size={18} />,
  "Coment":<LiaCommentSolid size={18} />,
  "Order":<FaMoneyCheckAlt size={18} />,
  "Poster":<FaRegImages size={18} />
}

export const metadata:Metadata = {
  title: "Dashboard - Misbahul's Shop",
  description: "Dashboard for Misbahul's Shop",
}

const page = async() => {
  const {usersLength,productsLength,categoriesLength,comentsLength,ordersLength,postersLength} = await getAllLength();
  const allData=[
    {
      name:'User',
      count:usersLength
    },
    {
      name:'Product',
      count:productsLength
    },
    {
      name:'Category',
      count:categoriesLength
    },
    {
      name:'Coment',
      count:comentsLength
    },
    {
      name:'Order',
      count:ordersLength
    },
    {
      name:'Poster',
      count:postersLength
    }
  ]

  const chartData=await getAllValuesByMonth();

  return (
    <div className='w-full h-full py-2'>
      <div className="w-full lg:max-w-5xl max-w-[80%] mx-auto flex gap-6 items-center justify-center flex-wrap px-6">
        {allData?.map((item,index)=>(
          <div key={index} className='flex flex-col justify-center h-full items-center flex-1 py-2 px-4 shadow-xl shadow-slate-700/20 rounded-lg animate-1-pulse'>
            <p className='lg:text-3xl md:Text-2xl text-sm font-bold'>{item.count}</p>
            <div className="flex gap-3 items-center">
              {ICON[item.name as keyof typeof ICON]}
              <p className='lg:text-xl md:text-lg text-sm text-slate-500 font-semibold'>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Chart chartData={chartData} />
    </div>
  )
}

export default page
