"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [status, setStatus] = useState({
        status: null,
        message: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: "",
            email: "",
            password: "",
        };

        // Validasi nama
        if (!formData.name.trim()) {
            valid = false;
            newErrors.name = "Name is required.";
        }

        // Validasi email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!formData.email.trim()) {
            valid = false;
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            valid = false;
            newErrors.email = "Invalid email format.";
        }

        // Validasi password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!formData.password.trim()) {
            valid = false;
            newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(formData.password)) {
            valid = false;
            newErrors.password =
                "Password must be at least 8 characters long and contain at least one uppercase letter and one digit.";
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Proses pengiriman data atau tindakan setelah formulir divalidasi
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}auth/register`,
                    formData
                )
                .then((res) => {
                    setStatus({
                        status: true,
                        message: "Success! Please log in to your account.",
                    });
                    setTimeout(() => {
                        window.location.href = "/auth/login";
                    }, 1000);
                })
                .catch((err) => {
                    setStatus({
                        status: false,
                        message:
                            err.data.message ||
                            "Success! Please log in to your account.",
                    });
                });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Link href={"/dashboard"}>
                            <div className="flex gap-1 group text-white hover:text-slate-200 cursor-pointer w-max text-lg items-center">
                                <FaArrowLeft
                                    size={24}
                                    className="text-white group-hover:text-slate-200"
                                />
                                Back to Dashboard
                            </div>
                        </Link>
                        {/* {status.message ? (
                            <div
                                className={`${
                                    status.success
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                } text-white text-base p-2 rounded-md flex items-center gap-2 border ${
                                    status.success
                                        ? "border-green-700"
                                        : "border-red-700"
                                }`}
                            >
                                {status.success ? (
                                    <div className="bg-white rounded-full">
                                        <FaCheckCircle
                                            size={24}
                                            className="text-green-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-full">
                                        <FaPlusCircle
                                            size={24}
                                            className="text-red-500 rotate-45"
                                        />
                                    </div>
                                )}{" "}
                                {status.message}
                            </div>
                        ) : null} */}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register
                        </h1>
                        <form
                            className="max-w-md mx-auto my-8"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-300 text-sm font-bold mb-2"
                                >
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`w-full border p-2 rounded focus:outline-none focus:shadow-outline ${
                                        errors.name && "border-red-500"
                                    }`}
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-300 text-sm font-bold mb-2"
                                >
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`w-full border p-2 rounded focus:outline-none focus:shadow-outline ${
                                        errors.email && "border-red-500"
                                    }`}
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-300 text-sm font-bold mb-2"
                                >
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`w-full border p-2 rounded focus:outline-none focus:shadow-outline ${
                                        errors.password && "border-red-500"
                                    }`}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            >
                                Register
                            </button>
                        </form>
                        <div className="flex flex-row gap-1 items-center">
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                            </p>
                            <Link href="/auth/login">
                                <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign in
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
