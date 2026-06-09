const EarningCard = ({ icon, title, value, subtitle }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-4 border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] active:scale-[0.98] transition">
      <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-black/5"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-lg shadow-sm">
            {icon}
          </div>

          <span className="text-[11px] font-semibold text-black/50 bg-[#f3f3f3] px-2.5 py-1 rounded-full">
            {subtitle}
          </span>
        </div>

        <p className="text-[12px] leading-4 text-gray-500 font-medium">
          {title}
        </p>

        <h3 className="text-[24px] leading-[30px] font-bold text-black mt-1 tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  )
}

export default EarningCard