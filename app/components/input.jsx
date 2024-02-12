"use client";

import React from "react";

const defaultStyle = "border border-slate-400 rounded-md p-2 w-full ";

function convertToCamelCase(text) {
    return text
        .toLowerCase()
        .replace(/\s(.)/g, (match) => match.toUpperCase())
        .replace(/\s/g, "")
        .replace(/^(.)/, (match) => match.toLowerCase());
}

export const InputText = (props) => {
    return (
        <input
            type="text"
            className={defaultStyle + props.class}
            value={props.value || ""}
            onChange={(e) =>
                props.onChange &&
                props.onChange(convertToCamelCase(props.name), e.target.value)
            }
            placeholder={props.name}
            disabled={props.disabled}
        />
    );
};
export const InputNumber = (props) => {
    return (
        <input
            type="number"
            className={defaultStyle + props.class}
            value={props.value || ""}
            onChange={(e) =>
                props.onChange &&
                props.onChange(convertToCamelCase(props.name), e.target.value)
            }
            placeholder={props.name}
            disabled={props.disabled}
        />
    );
};
