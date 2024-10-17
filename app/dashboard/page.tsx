"use client";

import { getAllLength, getAllValuesByMonth } from '@/actions/dashboard.action';
import Chart from '@/components/dashboard/Chart';
import { Metadata } from 'next';
import React, { useEffect, useState } from 'react';
import { FaMoneyCheckAlt, FaRegImages, FaRegWindowRestore } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { LiaCommentSolid } from 'react-icons/lia';
import { MdCategory } from 'react-icons/md';

const ICON = {
  "User": <HiUsers size={18} />,
  "Product": <FaRegWindowRestore size={18} />,
  "Category": <MdCategory size={18} />,
  "Coment": <LiaCommentSolid size={18} />,
  "Order": <FaMoneyCheckAlt size={18} />,
  "Poster": <FaRegImages size={18} />
};


const Page = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { usersLength, productsLength, categoriesLength, comentsLength, ordersLength, postersLength } = await getAllLength();
      
      const data = [
        { name: 'User', count: usersLength },
        { name: 'Product', count: productsLength },
        { name: 'Category', count: categoriesLength },
        { name: 'Coment', count: comentsLength },
        { name: 'Order', count: ordersLength },
        { name: 'Poster', count: postersLength }
      ];

      setAllData(data);

      const chart = await getAllValuesByMonth();
      setChartData(chart);
    };

    fetchData();
  }, []);

  return (
    <div className='w-full h-full py-2'>
      <div className="w-full lg:max-w-5xl max-w-[80%] mx-auto flex gap-6 items-center justify-center flex-wrap px-6">
        {allData?.map((item, index) => (
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
  );
};

export default Page;
