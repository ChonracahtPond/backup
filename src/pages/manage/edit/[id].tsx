import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LayoutPages from "@/components/layout";
// import LatestUser from "../../container/User/LatestUser";


const ReadUserDetail = () => {
    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters

    const [userData, setUserData] = useState<any>({}); // กำหนดประเภทของข้อมูลบทความข่าว
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/backupsever/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data); // กำหนดข้อมูลบทความข่าวที่ดึงมา
                    //console.log(data);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });
        }
    }, [id]);

    return (
        <>
            <LayoutPages>
                <div className="container mx-auto">
                    <div>
                        <div className="mt-8 mx-4 xl:mx-0">
                            <p className="text-2xl md:text-4xl font-semibold "> ชื่อเครื่อง : {userData.name}</p>
                        </div>
                    </div>

                    {/* Content Detail  */}
                    {/* <div className="xl:grid xl:grid-cols-9 xl:gap-6 mx-4 xl:mx-0"> */}

                    {/* Left Content */}
                    {/* <div className="col-span-7 mt-10 rounded-lg">
                            <div className="py-16">
                           
                                <article className="prose lg:prose-md md:mx-auto mt-8 px-2 md:px-0">
                                    <h1>{userData.subfname}</h1>
                                    <p>
                                        {userData.detail}
                                    </p>


                                </article>
                                
                            </div>
                        </div>
                    </div> */}
                </div>


                <form className=" container w-[80%] mx-auto">
                    <h1 className=" text-4xl text-[#ffffff] text-center mt-5 group relative h-12 w-48 overflow-hidden rounded-2xl bg-[#3399FF] font-bold mx-auto">แก้ไขข้อมูล</h1>
                    <div className=" flex flex-wrap  my-5">
                    <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    วัน/เดือน/ปี
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={userData.date}
                                    className="bg-[#F0FFE7] w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className=" sm:w-1/2 ">
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    ชื่อเครื่อง
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"

                                    placeholder={userData.name}
                                    className="bg-[#F0FFE7] w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-wrap  my-5">

                        <div className=" px-3 sm:w-1/2 ">
                            <div className="mb-5">
                                <label
                                    htmlFor="os"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    ระบบปฏิบัติการ
                                </label>
                                <input
                                    type="text"
                                    name="os"
                                    id="os"

                                    placeholder={userData.os}
                                    className="bg-[#F0FFE7] w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className=" px-3 sm:w-1/2 ">
                            <div className="mb-5">
                                <label
                                    htmlFor="detail"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    หมายเหตุ
                                </label>
                                <input
                                    type="text"
                                    name="detail"
                                    id="detail"

                                    placeholder="เบอร์ติดต่อ"
                                    className="bg-[#F0FFE7] w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-between">
                        <Link href={"/manage"}>
                            <button className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-[#3399FF] text-lg font-bold text-white">
                                ย้อนกลับ
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>
                        </Link>
                        <button disabled={isLoading}
                            className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-[#3399FF] text-lg font-bold text-white">
                            บันทึก
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                        </button>
                    </div>

                </form>

            </LayoutPages>
        </>
    )
}
export default ReadUserDetail;