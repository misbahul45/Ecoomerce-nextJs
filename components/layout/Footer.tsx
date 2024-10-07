import React from 'react';
import Link from 'next/link';
import { LuFacebook, LuInstagram, LuTwitter } from 'react-icons/lu';
import { LiaWhatsappSquare } from 'react-icons/lia';
const Footer = () => {
  return (
    <footer className='text-slate-600 py-8'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold border-b-2 border-blue-400 pb-2 mb-2'>About Us</h3>
            <p>
              Learn more about our story and mission.{' '}
              <span className='text-blue-400 hover:underline'>Discover How We Focus on Customer Satisfaction</span>
            </p>
          </div>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold border-b-2 border-blue-400 pb-2 mb-2'>Customer Service</h3>
            <div className='space-y-2'>
              <div>
                <Link href='/contact'>
                  <span className='hover:text-blue-400'>Contact Us</span>
                </Link>
              </div>
              <div>
                <Link href='/faq'>
                  <span className='hover:text-blue-400'>FAQ</span>
                </Link>
              </div>
              <div>
                <Link href='/returns'>
                  <span className='hover:text-blue-400'>Returns & Exchanges</span>
                </Link>
              </div>
              <div>
                <Link href='/privacy-policy'>
                  <span className='hover:text-blue-400'>Privacy Policy</span>
                </Link>
              </div>
              <div>
                <Link href='/terms'>
                  <span className='hover:text-blue-400'>Terms of Service</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold border-b-2 border-blue-400 pb-2 mb-2'>Follow Us</h3>
            <div className='flex justify-center items-center space-x-4'>
                <Link href={'/'} className='p-2 rounded-full shadow-md shadow-slate-800/60 hover:bg-red-500 hover:text-slate-100 transition-all duration-100'>
                    <LuInstagram size={24} />
                </Link>
                <Link href={'/'} className='p-2 rounded-full shadow-md shadow-slate-800/60 hover:bg-blue-700 hover:text-slate-100 transition-all duration-100'>
                    <LuFacebook size={24} />
                </Link>
                <Link href={'/'} className='p-2 rounded-full shadow-md shadow-slate-800/60 hover:bg-blue-900 hover:text-slate-100 transition-all duration-100'>
                    <LuTwitter size={24} />
                </Link>
                <Link href={'/'} className='p-2 rounded-full shadow-md shadow-slate-800/60 hover:bg-green-600 hover:text-slate-100'>
                    <LiaWhatsappSquare size={24} />
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='text-gray-500 pt-2'>
        <div className='container mx-auto px-6 text-center'>
          <p>&copy; 2024 Misbahul&lsquo;s Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
