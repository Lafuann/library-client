"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const DetailBook = ({ params }) => {
    const [isEdit, setIsEdit] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const router = useRouter();
    const [data, setData] = useState(null);
    const [categories, setCategories] = useState(null);
    const [values, setValues] = useState({
        title: "",
        description: "",
        image_url: "",
        release_year: null,
        price: "",
        total_page: null,
        thickness: "",
        category_id: null,
    });
    const names = [
        { name: "title", type: "text" },
        { name: "description", type: "text" },
        { name: "image_url", type: "text" },
        { name: "release_year", type: "number" },
        { name: "price", type: "number" },
        { name: "total_page", type: "number" },
        { name: "thickness", type: "text" },
    ];
    function removeUnderscore(inputString) {
        // Menggunakan metode replace untuk mengganti setiap "_" dengan string kosong
        return inputString.replace(/_/g, " ");
    }
    function handleChange(e) {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
    function validateData() {
        const errors = {};

        // Validasi apakah semua field wajib diisi
        if (!values.title) {
            errors.title = "Title is required.";
        }
        if (!values.description) {
            errors.description = "Description is required.";
        }
        if (!values.image_url) {
            errors.image_url = "Image URL is required.";
        }
        if (!values.release_year) {
            errors.release_year = "Release year is required.";
        }
        if (!values.price) {
            errors.price = "Price is required.";
        }
        if (!values.total_page) {
            errors.total_page = "Total page is required.";
        }

        // Validasi apakah release_year, price, dan total_page berupa angka
        if (isNaN(values.release_year)) {
            errors.release_year = "Release year must be a number.";
        }
        if (isNaN(values.price)) {
            errors.price = "Price must be a number.";
        }
        if (isNaN(values.total_page)) {
            errors.total_page = "Total page must be a number.";
        }

        // Validasi thickness berdasarkan total_page
        if (values.total_page <= 100) {
            values.thickness = "tipis";
        } else if (values.total_page >= 101 && values.total_page <= 200) {
            values.thickness = "sedang";
        } else {
            values.thickness = "tebal";
        }

        return errors;
    }

    function handleSave(e) {
        e.preventDefault();
        if (validateData()) {
            axios
                .put(
                    `${process.env.NEXT_PUBLIC_BASE_URL}books/${params.id}?`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: res.data.message || "Book has been edited!",
                        showCloseButton: false,
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    setTimeout(() => {
                        router.push("/book");
                    }, 3000);
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: res.data.message || "Failed",
                        showCloseButton: false,
                        showConfirmButton: true,
                    });
                    console.log("err", err);
                });
        }
    }

    function DeleteBook() {
        Swal.fire({
            icon: "warning",
            title: "Are you sure to delete this book?",
            confirmButtonText: "Yes, I'm sure",
            cancelButtonText: "No",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                axios
                    .delete(
                        `${process.env.NEXT_PUBLIC_BASE_URL}books/${params.id}?token=${token}`
                    )
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: res.data.message || "Book has been deleted!",
                            showCloseButton: false,
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        setTimeout(() => {
                            router.push("/book");
                        }, 3000);
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: res.data.message || "Failed",
                            showCloseButton: false,
                            showConfirmButton: true,
                        });
                        console.log("err", err);
                    });
            }
        });
    }

    useEffect(() => {
        if (values.total_page && isEdit) {
            let thickness = "";
            const totalPage = Number(values.total_page);
            if (totalPage <= 100) {
                thickness = "tipis";
            } else if (totalPage <= 200) {
                thickness = "sedang";
            } else {
                thickness = "tebal";
            }
            setValues((prevValues) => ({
                ...prevValues,
                thickness: thickness,
            }));
        }
    }, [values.total_page, isEdit]);

    useEffect(() => {
        if (!categories) {
            axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}categories`)
                .then((res) => {
                    setCategories(res.data.data);
                })
                .catch((err) => console.log(err));
        }
        if (params.id && !data) {
            axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}books/${params.id}`)
                .then((res) => {
                    let data = res.data.data;
                    setData(data);
                    setValues((prevValues) => ({
                        ...prevValues,
                        title: data.title,
                        description: data.description,
                        image_url: data.image_url,
                        release_year: data.release_year,
                        price: data.price,
                        total_page: data.total_page,
                        thickness: data.thickness,
                        category_id: data.category_id,
                    }));
                })
                .catch((err) => console.log("err", err));
        }
    }, [params, data, categories]);

    return (
        <>
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
                    <span>Detail</span>
                </h2>
            </div>
            {token ? (
                <button
                    type="button"
                    onClick={(e) => setIsEdit(!isEdit)}
                    className="bg-blue-300 rounded-md py-2 px-3 text-white"
                >
                    {isEdit ? "Cancel" : "Edit"}
                </button>
            ) : null}
            <form onSubmit={handleSave} className="flex flex-col gap-4 mt-4">
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
                                value={values ? values[item.name] : ""}
                                onChange={(e) => handleChange(e)}
                                readOnly
                            />
                        ) : (
                            <input
                                className={"p-2 rounded-md"}
                                type={item.type}
                                id={item.name}
                                name={item.name}
                                value={values ? values[item.name] : ""}
                                onChange={(e) => handleChange(e)}
                                readOnly={!isEdit}
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
                        value={values && values.category_id}
                        onChange={(e) => handleChange(e)}
                        disabled={!isEdit}
                    >
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
                    {isEdit && (
                        <button
                            className="bg-green-500 text-white py-2 px-3 rounded-md"
                            type="submit"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    )}
                    <button
                        className="bg-red-500 text-white py-2 px-3 rounded-md"
                        type="button"
                        onClick={DeleteBook}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </>
    );
};

export default DetailBook;
