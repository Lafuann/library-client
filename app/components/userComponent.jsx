"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../GlobalRefux/Features/User/user";
import Swal from "sweetalert2";
import { removeToken } from "../GlobalRefux/Features/Auth/auth";
import { useRouter } from "next/navigation";

export default function UserComponent() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    function handleClick() {
        setOpen(!open);
    }
    function handleLogout() {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                dispatch(removeToken());
                dispatch(removeUser());
                Swal.fire({
                    icon: "success",
                    title: res.data.message || "Success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1500);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }
    useEffect(() => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}auth/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                setProfile(res.data);
                dispatch(setUser(res.data));
            })
            .catch((err) => {
                setProfile(null);
                console.log("err", err);
            });
    }, [token, dispatch]);

    return (
        <>
            <div className="relative z-0">
                <button onClick={handleClick} className="z-0">
                    {profile ? profile.name : "-"}
                </button>
                {open && (
                    <div className="absolute top-10 right-0 z-10 w-max h-max bg-white shadow-md p-4 rounded-md hover:brightness-90">
                        <p
                            className="text-black text-base cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
