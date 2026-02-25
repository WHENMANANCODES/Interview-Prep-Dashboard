function StatsCard({title,value}){
  return(
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-sm text-gray-500">{title}</h2>
    <p className="text-2xl font-semibold mt-2">{value}</p>
  </div>
  )
}

export default StatsCard