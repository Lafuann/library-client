"use client";

import React from "react";

const defaultStyle = "border border-slate-400 rounded-md p-2 w-full ";

export const InputText = (props) => {
    return (
        <input
            type="text"
            className={defaultStyle + props.class}
            placeholder={props.name}
        />
    );
};
export const InputNumber = (props) => {
    return (
        <input
            type="number"
            className={defaultStyle + props.class}
            placeholder={props.name}
        />
    );
};
