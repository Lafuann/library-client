import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { Providers } from "../GlobalRefux/provider";
import UserComponent from "./userComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const LayoutComponent = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="flex flex-row w-screen h-screen">
                        <div className="flex flex-col w-1/4 h-full overflow-hidden z-20">
                            <div className="bg-blue-500 h-20 w-full flex items-center pl-2">
                                <h1 className="text-white text-xl">
                                    Library App
                                </h1>
                            </div>
                            <div className="bg-white h-full w-full flex flex-col pt-10">
                                <Link href={"/book"}>
                                    <div className="h-10 w-full px-5 border-b border-black flex items-center hover:backdrop-brightness-90">
                                        <p className="text-black text-base">
                                            Book
                                        </p>
                                    </div>
                                </Link>
                                <Link href={"/category"}>
                                    <div className="h-10 w-full px-5 border-b border-black flex items-center hover:backdrop-brightness-90">
                                        <p className="text-black text-base">
                                            Category
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <header className="w-full h-20 bg-white flex justify-end items-center pr-20 shadow-header z-10">
                                <UserComponent />
                            </header>
                            <div className="p-5 bg-slate-200 w-full h-full overflow-auto z-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
};

export default LayoutComponent;
