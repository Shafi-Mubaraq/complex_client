const Info = ({ label, value, highlight }) => (
    <div className="bg-slate-50 p-4 rounded-xl">
        <p className="text-xs uppercase text-slate-400 font-bold">{label}</p>
        <p className={`font-black ${highlight ? "text-indigo-600 text-lg" : ""}`}>
            {value}
        </p>
    </div>
);

export default Info;