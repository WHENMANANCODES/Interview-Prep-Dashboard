function StatsCard({ title, value }) {
  return (
    <div className="bg-sky-400 p-6 rounded-2xl shadow-md border border-gray-100 
                    hover:shadow-xl hover:-translate-y-1 
                    transition-all duration-300 ease-in-out">

      <h2 className="text-sm font-medium text-gray-500 tracking-wide">
        {title}
      </h2>

      <p className="text-3xl font-bold text-gray-800 mt-3">
        {value}
      </p>

    </div>
  );
}

export default StatsCard;