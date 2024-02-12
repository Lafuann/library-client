"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { InputNumber, InputText } from "../components/input";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setValue } from "../GlobalRefux/Features/Book/filter";

const Book = () => {
    const [data, setData] = useState([]);
    const filter = useSelector((state) => state.filter);
    const [status, setStatus] = useState("loading");
    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (key, value) => {
        dispatch(setValue({ key, value }));
    };

    const makeQuery = (query) => {
        return `${query.title ? "&title=" + query.title : ""}${
            query.minYear ? "&min_year=" + query.minYear : ""
        }${query.maxYear ? "&max_year=" + query.maxYear : ""}${
            query.minPage ? "&min_page=" + query.minPage : ""
        }${query.maxPage ? "&max_page=" + query.maxPage : ""}${
            query.sortByTitle ? "&sort_by_title=" + query.sortByTitle : ""
        }`;
    };

    function handleFilter() {
        setStatus("loading");
        if (filter.categoryId) {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}categories/${
                        filter.categoryId
                    }/books?${makeQuery(filter)}`
                )
                .then((res) => {
                    setStatus("success");
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                    setStatus("failed");
                });
        } else {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}books?${makeQuery(
                        filter
                    )}`
                )
                .then((res) => {
                    setStatus("success");
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                    setStatus("failed");
                });
        }
    }
    useEffect(() => {
        setStatus("loading");
        if (!categories) {
            axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}categories`)
                .then((res) => {
                    setCategories(res.data.data);
                })
                .catch((err) => console.log(err));
        }
        axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}books`)
            .then((res) => {
                setStatus("success");
                setData(res.data.data);
            })
            .catch((err) => {
                console.log("err", err);
                setStatus("failed");
            });
    }, [categories]);

    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl text-gray-400">
                    <Link href={"/dashboard"}>
                        <span>Home</span>
                    </Link>
                    <span> / </span>
                    <span>Book</span>
                </h2>
            </div>

            <div className="mb-5 w-full grid grid-cols-11 gap-2">
                <div className="col-span-1 flex justify-center items-center">
                    <p className="text-xl">Filter</p>
                </div>
                <div className="col-span-1">
                    <InputText
                        disabled={filter.categoryId ? true : false}
                        class="bg-white"
                        name="title"
                        value={filter.title}
                        onChange={(key, value) => handleChange(key, value)}
                    />
                </div>
                <div className="col-span-1">
                    <InputNumber
                        disabled={filter.categoryId ? true : false}
                        class="bg-white"
                        name="Min Year"
                        value={filter.minYear}
                        onChange={(key, value) => handleChange(key, value)}
                    />
                </div>
                <div className="col-span-1">
                    <InputNumber
                        disabled={filter.categoryId ? true : false}
                        class="bg-white"
                        name="Max Year"
                        value={filter.maxYear}
                        onChange={(key, value) => handleChange(key, value)}
                    />
                </div>
                <div className="col-span-1">
                    <InputNumber
                        disabled={filter.categoryId ? true : false}
                        class="bg-white"
                        name="Min Page"
                        value={filter.minPage}
                        onChange={(key, value) => handleChange(key, value)}
                    />
                </div>
                <div className="col-span-1">
                    <InputNumber
                        disabled={filter.categoryId ? true : false}
                        class="bg-white"
                        name="Max Page"
                        value={filter.maxPage}
                        onChange={(key, value) => handleChange(key, value)}
                    />
                </div>
                <div className="col-span-1">
                    <select
                        class="border border-slate-400 rounded-md p-2 w-full bg-white"
                        name="Sort By Title"
                        value={filter.sortByTitle}
                        onChange={(e) =>
                            handleChange("sortByTitle", e.target.value)
                        }
                        disabled={filter.categoryId ? true : false}
                    >
                        <option value="" defaultChecked>
                            Sort By Title
                        </option>
                        <option value="desc">Newest</option>
                        <option value="asc">Oldest</option>
                    </select>
                </div>
                <div className="col-span-1">
                    <select
                        class="border border-slate-400 rounded-md p-2 w-full bg-white"
                        name="Sort By Title"
                        value={filter.category}
                        onChange={(e) =>
                            handleChange("categoryId", e.target.value)
                        }
                    >
                        <option value="" defaultChecked>
                            Category
                        </option>
                        {categories ? (
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.id} -&gt; {cat.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No data found.</option>
                        )}
                    </select>
                </div>
                <div className="col-span-1">
                    <button
                        className="w-full py-2 bg-red-500 text-white rounded-md"
                        type="button"
                        onClick={() => dispatch(resetFilters())}
                    >
                        Reset
                    </button>
                </div>
                <div className="col-span-1">
                    <button
                        className="w-full py-2 bg-yellow-500 text-white rounded-md"
                        type="button"
                        onClick={handleFilter}
                    >
                        Search
                    </button>
                </div>
                <div className="col-span-1">
                    <Link href={"/book/create"}>
                        <button
                            className="w-full py-2 bg-green-500 text-white rounded-md"
                            type="button"
                        >
                            + Add
                        </button>
                    </Link>
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
                {status === "success" ? (
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
                ) : (
                    status === "loading" && "Loading ..."
                )}
            </table>
        </>
    );
};

export default Book;
