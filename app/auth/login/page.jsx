"use client";

import { setToken } from "@/app/GlobalRefux/Features/Auth/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [status, setStatus] = useState({
        success: null,
        message: "",
    });
    const router = useRouter();

    function handleChange(e, name) {
        setFormData({
            ...formData,
            [name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}auth/login`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                setIsLoading(false);
                setStatus({
                    success: true,
                    message: "Login Successful!",
                });

                dispatch(setToken(res.data.access_token));
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);
            })
            .catch((err) => {
                setIsLoading(false);
                setStatus({
                    status: false,
                    message:
                        err.response?.data?.message ||
                        "An error occurred while logging in.",
                });
            });
    }

    useEffect(() => {
        if (isLogin) {
            router.push("/dashboard");
        }
    }, [isLogin]);

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
                        {status.message ? (
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
                        ) : null}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, "email")}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleChange(e, "password")
                                    }
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-70"
                                disabled={isLoading}
                            >
                                Sign in
                            </button>
                            <div className="flex flex-row gap-1 items-center">
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                </p>
                                <Link href="/auth/register">
                                    <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign up
                                    </p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
