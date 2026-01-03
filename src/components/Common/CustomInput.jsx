import React from "react";

const FOCUS_COLOR = "blue-600";

const CustomInput = ({ icon: Icon, ...rest }) => (
    <div className={`flex mt-3 items-center border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm transition focus-within:ring-2 focus-within:ring-${FOCUS_COLOR} focus-within:border-${FOCUS_COLOR}`}>
        {Icon && <Icon className="text-gray-500 mr-3 text-xl" />}
        <input
            {...rest}
            className="w-full text-gray-800 placeholder-gray-500 outline-none bg-transparent text-base"
        />
    </div>
);

export default CustomInput;