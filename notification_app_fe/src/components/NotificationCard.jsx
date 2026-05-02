export default function NotificationCard({ item }) {
  const typeColor = {
    Placement: "bg-green-500/20 border-green-400",
    Event: "bg-blue-500/20 border-blue-400",
    Result: "bg-purple-500/20 border-purple-400",
  };

  return (
    <div
      className={`p-5 rounded-xl border backdrop-blur-md 
      ${typeColor[item.Type] || "bg-white/10 border-white/20"} 
      hover:scale-[1.02] transition-all duration-300`}
    >
      <p className="text-sm text-gray-400">{item.Type}</p>

      <h2 className="text-lg font-semibold text-white">
        {item.Message}
      </h2>

      <p className="text-xs text-gray-500 mt-2">
        {new Date(item.Timestamp).toLocaleString()}
      </p>
    </div>
  );
}