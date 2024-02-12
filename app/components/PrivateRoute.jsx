"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../GlobalRefux/Features/Auth/auth";
import { removeUser, setUser } from "../GlobalRefux/Features/User/user";

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/auth/login");
        } else {
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
                    if (!user) {
                        dispatch(setUser(res.data.data));
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                    dispatch(removeToken());
                    dispatch(removeUser());
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 500);
                });
        }
    }, [token, user]);

    return <>{children}</>;
};

export default PrivateRoute;
