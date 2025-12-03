import React from "react";

const CustomInput = ({ icon: Icon, ...rest }) => (
    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition">
        {Icon && <Icon className="text-gray-500 mr-3 text-lg" />}
        <input 
            {...rest} 
            className="w-full text-gray-700 placeholder-gray-500 outline-none bg-transparent" 
        />
    </div>
);

export default CustomInput; 