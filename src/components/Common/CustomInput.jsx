import React from "react";

const FOCUS_COLOR = "blue-600";
const CustomInput = React.forwardRef(({ icon: Icon, className, ...rest }, ref) => (
    <div className={`flex items-center border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 focus-within:bg-white ${className}`}>
        {Icon && <Icon className="text-slate-400 mr-3 text-lg" />}
        <input
            ref={ref}
            {...rest}
            className="w-full text-slate-700 placeholder-slate-400 outline-none bg-transparent text-sm font-medium"
        />
    </div>
));

export default CustomInput;