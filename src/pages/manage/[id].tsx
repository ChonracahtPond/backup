import LayoutPages from "@/components/layout";
import Link from "next/link";

import React, { useState, useEffect, ReactNode } from 'react';
import ViewDetail from "./[id]";

interface Backupsever {
    [x: string]: ReactNode;
    id: number;

}


export default function manage() {
    const initialVisibleItems = 10000;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [backupseverData, setBackupseverData] = useState<Backupsever[]>([]); // Use the defined interface here
    const [isLoading, setIsLoading] = useState(true);



    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 1000);
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
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                ลำดับ
                                            </th>
                                           
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                ชื่อเครื่อง
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                os
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                สถานะ
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                หมายเหตุ
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
                                                    {backupsever.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-light">
                                                    {backupsever.os}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-light">
                                                    {backupsever.status}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-light">
                                                    {backupsever.detail}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link href={`/manage/edit/${backupsever.id}`}>

                                                        <button
                                                            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                            data-ripple-light="true"
                                                        >
                                                            แก้ไข
                                                        </button>
                                                    </Link>
                                                    <Link href={`/manage/${backupsever.id}`}>

                                                        <button
                                                            className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                            data-ripple-light="true"
                                                        >
                                                            ลบ
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