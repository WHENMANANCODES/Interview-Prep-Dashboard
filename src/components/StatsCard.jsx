function StatsCard({ title, value,onClick }) {
  return (
    <>
      <div 
       onClick = {onClick}
       className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100">
        <h2 className="text-sm font-medium text-gray-500 tracking-wide">
          {title}
        </h2>

        <p className="text-3xl font-bold text-gray-800 mt-3">
          {value}
        </p>
      </div>
    </>
  );
}

export default StatsCard;