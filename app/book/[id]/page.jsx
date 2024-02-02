"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailBook = ({ params }) => {
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();
    const [data, setData] = useState(null);
    const names = [
        { name: "title", type: "text" },
        { name: "description", type: "text" },
        { name: "image_url", type: "text" },
        { name: "release_year", type: "number" },
        { name: "price", type: "text" },
        { name: "total_page", type: "number" },
        { name: "thickness", type: "text" },
        { name: "category_id", type: "number" },
    ];
    const removeUnderscore = (inputString) => {
        // Menggunakan metode replace untuk mengganti setiap "_" dengan string kosong
        return inputString.replace(/_/g, " ");
    };

    console.log("router", router);
    useEffect(() => {
        if (params.id && !data) {
            axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}books/${params.id}`)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => console.log("err", err));
        }
    }, [params, data]);

    console.log("data", data);

    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl text-gray-400">
                    <Link href={"/"}>
                        <span>Home</span>
                    </Link>
                    <span> / </span>
                    <Link href={"/book"}>
                        <span>Book</span>
                    </Link>
                    <span> / </span>
                    <span>Detail</span>
                </h2>
            </div>
            <button
                type="button"
                onClick={(e) => setIsEdit(!isEdit)}
                className="bg-blue-300 rounded-md py-2 px-3 text-white"
            >
                {isEdit ? "Cancel" : "Edit"}
            </button>
            <div className="flex flex-col gap-4 mt-4">
                {names.map((item, index) => (
                    <div className="flex flex-col gap-1 w-full" key={index}>
                        <label htmlFor={item.name} className="capitalize">
                            {removeUnderscore(item.name)}
                        </label>
                        <input
                            className={"p-2 rounded-md"}
                            type={item.type}
                            id={item.name}
                            name={item.name}
                            value={data[item.name]}
                            readOnly={!isEdit}
                        />
                    </div>
                ))}
                <div className="flex gap-2 mt-2 mb-10">
                    {isEdit && (
                        <button className="bg-green-500 text-white py-2 px-3 rounded-md">
                            Save
                        </button>
                    )}
                    <button className="bg-red-500 text-white py-2 px-3 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default DetailBook;
