import React, { useState } from "react";
import useAxios from 'axios-hooks';
import Link from "next/link";
import LayoutPages from "@/components/layout";

export default function Home() {
    const [{ error: errorMessage, loading: IndexActivityLoading }, executeIndexActivity] = useAxios(
        { url: '/api/backupsever', method: 'POST' },
        { manual: true }
    );

    const [date, setdate] = useState<string>("");
    const [name, setname] = useState<string>("");
    const [os, setos] = useState<string>("");
    const [status, setstatus] = useState<string>("");
    const [detail, setdetail] = useState<string>("");
    const [img, setImg] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMissingModalOpen, setIsMissingModalOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !name || !os || !detail) {
            setIsMissingModalOpen(true);
            return;
        }

        try {
            setIsLoading(true);
            const response = await executeIndexActivity({
                data: {
                    date,
                    name,
                    os,
                    status,
                    detail,
                    img,
                },
            });

            setIsLoading(false);
            setIsSuccess(true);
            setMessage("สำเร็จ! คุณได้ทำการจองคิวเรียบร้อยแล้ว");
            setIsModalOpen(true);
        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            setMessage("เกิดข้อผิดพลาดในการจองคิว");
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        window.location.reload();
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        window.location.reload();
        setIsModalOpen(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Data = event.target?.result as string;
                setImg(base64Data);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <LayoutPages>
                <form className=" container w-[80%] mx-auto">
                    <h1 className=" text-4xl text-[#ffffff] text-center mt-5 group relative h-12 w-48 overflow-hidden rounded-2xl bg-[#3399FF] font-bold mx-auto">เพิ่มงาน</h1>

                    <div className=" flex flex-wrap  my-5">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="date"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    วัน/เดือน/ปี
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={date} onChange={(e) => setdate(e.target.value)}
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
                                    value={name} onChange={(e) => setname(e.target.value)}
                                    placeholder="ชื่องาน"
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
                                    value={os} onChange={(e) => setos(e.target.value)}
                                    placeholder="สถานที่ติดตั้งงาน"
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
                                    value={detail} onChange={(e) => setdetail(e.target.value)}
                                    placeholder="หมายเหตุ"
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
                                    สถานะ
                                </label>
                                <input
                                    type="text"
                                    name="detail"
                                    id="detail"
                                    value={status} onChange={(e) => setstatus(e.target.value)}
                                    placeholder="สถานะ"
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
                            onClick={handleSubmit} className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-[#3399FF] text-lg font-bold text-white">
                            ยืนยัน
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                        </button>
                    </div>
                    {isMissingModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
                            <div className="bg-white p-6 rounded-lg text-center">
                                <p className="text-red-500 text-lg mb-4">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                                <button
                                    onClick={() => setIsMissingModalOpen(false)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none"
                                >
                                    ปิด
                                </button>
                            </div>
                        </div>
                    )}
                    {isModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                            <div className="bg-white p-6 rounded-lg mx-auto">
                                <p className="text-2xl font-semibold mb-4">ยืนยันการเพิ่มข้อมูล</p>
                                <p>คุณต้องการเพิ่มข้อมูลหรือไม?</p>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleCloseModal} // เรียกใช้งานเมื่อกดปุ่ม "ยกเลิก"
                                        className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        onClick={handleConfirm} // เรียกใช้งานเมื่อกดปุ่ม "ยืนยัน"
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        ยืนยัน
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </form>




            </LayoutPages>

        </>
    )
}