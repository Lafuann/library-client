"use client";

import { useSelector } from "react-redux";

export default function Dashboard() {
    const user = useSelector((state) => state.user?.data);
    return (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <h3 className=" text-2xl">Welcome to Library APP</h3>
            <h1 className="text-blue-500 text-4xl">{user ? user.name : ""}</h1>
        </div>
    );
}
