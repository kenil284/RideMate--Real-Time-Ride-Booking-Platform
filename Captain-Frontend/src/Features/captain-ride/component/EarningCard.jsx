const EarningCard = ({ icon, title, value, subtitle }) => {
  return (
    <div className="rounded-3xl bg-gray-50 p-5 border border-gray-100">
      <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black mb-4">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold text-black mt-1">{value}</h3>

      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
};

export default EarningCard;