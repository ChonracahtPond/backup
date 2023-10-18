import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/outline';



export default function Navbar() {
    return (
      
      <div className='w-full h-[70px] bg-[#3399FF]'>
        <div className='flex justify-end items-center h-full text-white text-xl mr-5'>
          <Link href={'/manage'} className='mx-2'>
            หน้าแรก
          </Link>
          <Link href={'/manage/search'} className='mx-2'>
            ค้นหาข้อมูล
          </Link>
          <Link href={'../manage/formback'} className='mx-2'>
            เพิ่มงาน
          </Link>
         
          <Link href={'/lastwork'} className='mx-2'>
          ปฏิทินงาน
          </Link>
         
        </div>
      </div>
    );
  }
  
