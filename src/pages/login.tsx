import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Login() {
    const [data, setData] = useState<{ userbackup: { name: string, password: string } } | null>(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/userbackup");
            const data = await response.json();
            const match = data?.userbackup?.find((userbackup: { name: string, password: string, id: string }) => {
                return userbackup.name === name && userbackup.password === password;
            });

            if (match) {
                setLoginSuccess(true);
                localStorage.setItem("isLoggedIn", "true"); // Set the logged-in state
                router.push(`/manage`);
            } else {
                setLoginSuccess(false);
                setLoginMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        fetch("/api/userbackup")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">

                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="images/bgbackup.jpg" alt="Placeholder Image" className=" mx-auto my-20 w-[500px] h-[500px] object-cover " />
                </div>

                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form action="#" method="POST">

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">Username</label>
                            <input  value={name} onChange={(e) => setName(e.target.value)} type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                        </div>

                
                        <button onClick={handleLogin} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                        {loginMessage && <p className={`text-${loginSuccess ? "success" : "danger"}`}>{loginMessage} </p>}
                    </form>

                    <div className="mt-6 text-blue-500 text-center">
                        <a href="#" className="hover:underline">Sign up Here</a>
                    </div>

                    <div className="mt-6 text-blue-500 text-center">
                        <a href="#" className="hover:underline">Sign up Here</a>
                    </div>
                </div>
            </div>
            {/* <div classNameName=" mx-auto">
                <img src="../images/bg1.png" alt="" classNameName=" w-[700px] justify-center mx-auto" />
                <h1 classNameName='text-center text-[#049112] text-6xl'>เข้าสู่ระบบ</h1>



                <form action="" classNameName="w-[800px] mx-auto">
                    <div id="input" classNameName="flex flex-col w-full my-5 ">
                        <label htmlFor="name" classNameName=" mb-2"
                        >ชื่อ</label>
                        <input
                            type="text"
                            value={name} onChange={(e) => setName(e.target.value)}
                            id="name"
                            placeholder="ชื่อ"
                            classNameName="appearance-none border-2 border-gray-500 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2  focus:shadow-lg  "
                        />
                    </div>
                    <div id="input" classNameName="flex flex-col w-full my-5">
                        <label htmlFor="password" classNameName=" mb-2"
                        >รหัสผ่าน</label>
                        <input
                            type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="รหัสผ่าน"
                            classNameName="appearance-none border-2 border-gray-500 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2  focus:shadow-lg "
                        />
                    </div>
                    <div id="button" classNameName="flex flex-col w-full my-5">

                        <div classNameName="flex">
                            <button onClick={handleLogin} classNameName="group relative h-12 w-full overflow-hidden rounded-2xl bg-[#049112]  text-1xl font-bold text-white" type="submit" >
                                เข้าสู่ระบบ
                                <div classNameName="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </button>
                        </div>
                        {loginMessage && <p classNameName={`text-${loginSuccess ? "success" : "danger"}`}>{loginMessage} </p>}
                


                    </div>



                    <div classNameName=" text-white text-center my-6 ">
                        <Link href="../registers">
                            <p>ยังไม่มีบัญชีผู้ใช้?</p>
                            <span classNameName="text-[#18BCEB]">สมัครสมาชิกใหม่</span>
                        </Link>
                    </div>
                </form>
            </div> */}
        </>
    )
}