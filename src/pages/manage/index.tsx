import LayoutPages from "@/components/layout";
import Link from "next/link";

import React, { useState, useEffect, ReactNode } from 'react';
import ViewDetail from "./[id]";


interface Backupsever {
  [x: string]: ReactNode;
  id: number;

}


export default function manage() {
  const initialVisibleItems = 3;
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
  const [backupseverData, setBackupseverData] = useState<Backupsever[]>([]); // Use the defined interface here
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 3);
  };

  useEffect(() => {
    fetch('/api/backupsever')
      .then((response) => response.json())
      .then((data) => {
        setBackupseverData(data.backupsever);
        setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์
      });
  }, []);


  return (
    <>
      <LayoutPages>
        <div className="flex flex-col mx-auto">
          <Link className=" mx-5 my-5"  href={"../manage/formback"} >

            <button
              className=" middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              เพิ่ม
            </button>
          </Link>
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 mx-auto" >
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        ลำดับ
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        วันที่
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {backupseverData.slice(0, visibleItems).map((backupsever, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-light">
                          {backupsever.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/manage/${backupsever.id}`}>

                            <button
                              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-light="true"
                            >
                              ดูรายละเอียด
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </LayoutPages>

    </>
  );
}