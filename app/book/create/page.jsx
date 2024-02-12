"use client";

import { setValue } from "@/app/GlobalRefux/Features/Book/addBook";
import PrivateRoute from "@/app/components/PrivateRoute";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddBook = () => {
    const formData = useSelector((state) => state.addBook);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState(null);
    const router = useRouter();
    const names = [
        { name: "title", type: "text" },
        { name: "description", type: "text" },
        { name: "image_url", type: "text" },
        { name: "release_year", type: "number" },
        { name: "price", type: "text" },
        { name: "total_page", type: "number" },
        { name: "thickness", type: "text" },
    ];
    const removeUnderscore = (inputString) => {
        // Menggunakan metode replace untuk mengganti setiap "_" dengan string kosong
        return inputString.replace(/_/g, " ");
    };

    const handleChange = (key, value) => {
        dispatch(setValue({ key, value }));
    };

    function scrollToForm() {
        const formElement = document.getElementById("form");

        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    const handleSave = () => {
        const validateForm = (formData) => {
            const errors = {};

            names.forEach((field) => {
                const { name, type } = field;
                const value = formData[name];

                // Validasi apakah form tidak boleh kosong
                if (!value) {
                    errors[name] = `${name} is required.`;
                } else {
                    // Validasi tipe input number
                    if (type === "number" && isNaN(Number(value))) {
                        errors[name] = `${name} must be a number.`;
                    }

                    // Validasi tipe input text (price)
                    if (
                        type === "text" &&
                        name === "price" &&
                        !/^\d+$/.test(value)
                    ) {
                        errors[name] = `${name} must contain only numbers.`;
                    }

                    // Validasi release_year
                    if (
                        name === "release_year" &&
                        (value <= 1980 || value >= 2021)
                    ) {
                        errors[name] = `${name} must be between 1980 and 2021.`;
                    }
                }
            });

            return errors;
        };

        if (Object.keys(validateForm(formData)).length === 0) {
            const values = {
                title: formData.title,
                description: formData.description,
                image_url: formData.image_url,
                release_year: formData.release_year,
                price: formData.price,
                total_page: formData.total_page,
                category_id: formData.category_id,
            };
            axios
                .post(`${process.env.NEXT_PUBLIC_BASE_URL}books`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Book has been added.",
                        showCancelButton: false,
                    }).then((res) => {
                        if (res.isConfirmed || res.isDismissed) {
                            router.push("/book");
                        }
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to add the book.",
                        showCancelButton: false,
                    }).then((res) => {
                        if (res.isConfirmed || res.isDismissed) {
                            scrollToForm();
                        }
                    });
                });
        } else {
        }
    };

    useEffect(() => {
        if (formData.total_page) {
            let thickness = "";
            const totalPage = parseInt(formData.total_page);
            if (!totalPage) {
                thickness = "";
            } else if (totalPage <= 100) {
                thickness = "tipis";
            } else if (totalPage <= 200) {
                thickness = "sedang";
            } else {
                thickness = "tebal";
            }
            let key = "thickness";
            handleChange(key, thickness);
        }
    }, [formData.total_page, dispatch]);

    useEffect(() => {
        if (!categories) {
            axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}categories`)
                .then((res) => {
                    setCategories(res.data.data);
                })
                .catch((err) => console.log(err));
        }
    }, [categories]);

    return (
        <PrivateRoute>
            <div className="mb-10">
                <h2 className="text-xl text-gray-400">
                    <Link href={"/dashboard"}>
                        <span>Home</span>
                    </Link>
                    <span> / </span>
                    <Link href={"/book"}>
                        <span>Book</span>
                    </Link>
                    <span> / </span>
                    <span>Add Book</span>
                </h2>
            </div>
            <div className="flex flex-col gap-4 mt-4" id="form">
                {names.map((item, index) => (
                    <div className="flex flex-col gap-1 w-full" key={index}>
                        <label htmlFor={item.name} className="capitalize">
                            {removeUnderscore(item.name)}
                        </label>
                        {item.name === "thickness" ? (
                            <input
                                className={"p-2 rounded-md"}
                                type={item.type}
                                id={item.name}
                                name={item.name}
                                value={formData.thickness}
                                readOnly
                            />
                        ) : (
                            <input
                                className={"p-2 rounded-md"}
                                type={item.type}
                                id={item.name}
                                name={item.name}
                                value={formData[item.name]}
                                onChange={(e) =>
                                    handleChange(item.name, e.target.value)
                                }
                            />
                        )}
                    </div>
                ))}

                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor={"categories_id"} className="capitalize">
                        Category Id
                    </label>
                    <select
                        className={"p-2 rounded-md"}
                        id={"category_id"}
                        name={"category_id"}
                        value={formData && formData.category_id}
                        onChange={(e) =>
                            handleChange("category_id", e.target.value)
                        }
                    >
                        <option value="" defaultChecked>
                            Select Category
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
                <div className="flex gap-2 mt-2 mb-10">
                    <button
                        className="bg-green-500 text-white py-2 px-3 rounded-md"
                        onClick={() => handleSave()}
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-3 rounded-md"
                        onClick={() => router.push("/book")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default AddBook;
