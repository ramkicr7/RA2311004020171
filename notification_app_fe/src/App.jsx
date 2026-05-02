import { useEffect, useState } from "react";
import { getToken } from "./services/auth";
import { fetchNotifications } from "./services/api";
import { getTopNotifications } from "./utils/priority";
import { Log } from "./logging_middleware/logger";
import { ChevronDown, Sparkles } from "lucide-react";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [top, setTop] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("Placement");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const loadData = async () => {
      try {
        setLoading(true);

        const token = await getToken();
        if (!token) {
          setError("Authentication failed");
          return;
        }

        await Log("frontend", "info", "api", "Token fetched");

        const data = await fetchNotifications(token);

        setNotifications(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");

        await Log("frontend", "error", "api", "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const topNotifications = getTopNotifications(notifications, top);

  const filtered = topNotifications.filter(
    (item) => item.Type === activeTab
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden p-6">

      
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 40%)`,
        }}
      />

      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

        {/* 🔥 LEFT SIDE */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Sparkles className="text-blue-400 w-4 h-4" />
            <span className="text-blue-300 text-sm">
              Smart Notification System
            </span>
          </div>

          <h1 className="text-6xl font-bold leading-tight mb-6">
            <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Campus Alerts
            </span>
            <span className="block bg-gradient-to-b from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Prioritized
            </span>
            <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Real-Time Feed
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Placement, Events, Results — all in one intelligent dashboard.
          </p>

          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">

            <h2 className="text-xl font-semibold mb-4 text-blue-300">
              SRM Campus Insights
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-500/10 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {notifications.filter(n => n.Type === "Placement").length}
                </p>
                <p className="text-xs text-gray-400">Placements</p>
              </div>

              <div className="bg-cyan-500/10 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-cyan-400">
                  {notifications.filter(n => n.Type === "Event").length}
                </p>
                <p className="text-xs text-gray-400">Events</p>
              </div>

              <div className="bg-purple-500/10 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-purple-400">
                  {notifications.filter(n => n.Type === "Result").length}
                </p>
                <p className="text-xs text-gray-400">Results</p>
              </div>
            </div>

            {/* Highlights */}
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✔ AI-based priority sorting</li>
              <li>✔ Real-time campus updates</li>
              <li>✔ Placement & result tracking</li>
              <li>✔ Clean dashboard interface</li>
            </ul>
          </div>
        </div>

        {/* 🔥 RIGHT PANEL */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 text-sm">
              Notification Feed
            </span>

            <div className="flex items-center gap-2">
              <select
                value={top}
                onChange={(e) => setTop(Number(e.target.value))}
                className="bg-slate-800 text-white px-2 py-1 rounded text-sm"
              >
                <option value={5}>Top 5</option>
                <option value={10}>Top 10</option>
                <option value={15}>Top 15</option>
              </select>

              <ChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {["Placement", "Event", "Result"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          
          <div className="space-y-3 max-h-[420px] overflow-y-auto">

            {loading && <p className="text-gray-400 text-center">Loading...</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}

            {!loading && filtered.length === 0 && (
              <p className="text-gray-400 text-center">
                No {activeTab} notifications
              </p>
            )}

            {!loading &&
              filtered.map((item) => {
                const colors = {
                  Placement: "border-green-400 bg-green-500/10",
                  Event: "border-blue-400 bg-blue-500/10",
                  Result: "border-purple-400 bg-purple-500/10",
                };

                return (
                  <div
                    key={item.ID}
                    className={`p-4 rounded-xl border ${
                      colors[item.Type]
                    } hover:scale-[1.03] transition`}
                  >
                    <p className="text-xs text-gray-400">
                      {item.Type}
                    </p>

                    <h2 className="text-sm font-semibold">
                      {item.Message}
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.Timestamp).toLocaleString()}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}