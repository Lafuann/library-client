"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { InputText } from "../components/input";

const Book = () => {
    const [data, setData] = useState([]);

    const makeQuery = (query) => {
        return `${query.title ? "&title=" + query.title : ""}${
            query.minYear ? "&min_year=" + query.minYear : ""
        }${query.maxYear ? "&max_year=" + query.maxYear : ""}${
            query.minPage ? "&min_page=" + query.minPage : ""
        }${query.maxPage ? "&max_page=" + query.maxPage : ""}${
            query.sortByTitle ? "&sort_by_title=" + query.sortByTitle : ""
        }`;
    };
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}books`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => console.log("err", err));
    }, []);

    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl text-gray-400">
                    <Link href={"/"}>
                        <span>Home</span>
                    </Link>
                    <span> / </span>
                    <span>Book</span>
                </h2>
            </div>

            <div className="mb-5 w-full grid grid-cols-9 gap-2">
                <div className="col-span-1 flex justify-center items-center">
                    <p className="text-xl">Filter</p>
                </div>
                <div className="col-span-1">
                    <InputText class="bg-white" name="title" />
                </div>
                <div className="col-span-1">
                    <InputText class="bg-white" name="Minimal Year" />
                </div>
                <div className="col-span-1">
                    <InputText class="bg-white" name="Maximum Year" />
                </div>
                <div className="col-span-1">
                    <InputText class="bg-white" name="Minimal Page" />
                </div>
                <div className="col-span-1">
                    <InputText class="bg-white" name="Maximum Page" />
                </div>
                <div className="col-span-1">
                    <InputText class="bg-white" name="Sort By Title" />
                </div>
                <div className="col-span-1">
                    <button
                        className="w-full py-2 bg-yellow-500 text-white rounded-md"
                        type="button"
                    >
                        Search
                    </button>
                </div>
                <div className="col-span-1">
                    <button
                        className="w-full py-2 bg-green-500 text-white rounded-md"
                        type="button"
                    >
                        Add
                    </button>
                </div>
            </div>

            <table class="border-collapse border border-slate-500 table-auto w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Title</th>
                        <th className="border border-slate-600">Description</th>
                        <th className="border border-slate-600">
                            Release Year
                        </th>
                        <th className="border border-slate-600">Thickness</th>
                        <th className="border border-slate-600">Image Url</th>
                        <th className="border border-slate-600">Total Page</th>
                        <th className="border border-slate-600">Category</th>
                        <th className="border border-slate-600">Price</th>
                        <th className="border border-slate-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-slate-700">
                                {index + 1}
                            </td>
                            <td className="border border-slate-700">
                                {item.title}
                            </td>
                            <td className="border border-slate-700">
                                {item.description}
                            </td>
                            <td className="border border-slate-700">
                                {item.release_year}
                            </td>
                            <td className="border border-slate-700">
                                {item.thickness}
                            </td>
                            <td className="border border-slate-700">
                                {item.image_url}
                            </td>
                            <td className="border border-slate-700">
                                {item.total_page}
                            </td>
                            <td className="border border-slate-700">
                                {item.category_id}
                            </td>
                            <td className="border border-slate-700">
                                {item.price}
                            </td>
                            <td className="border border-slate-700">
                                <div className="flex gap-1 justify-center items-center h-full">
                                    <Link href={`/book/${item.id}`}>
                                        <FaEye
                                            size={16}
                                            className="text-yellow-500"
                                        />
                                    </Link>
                                    <Link href={`/category/${item.id}`}>
                                        <FaTrash
                                            size={16}
                                            className="text-red-500"
                                        />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Book;
