import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    topic: "",
  });

  const token = localStorage.getItem("token");
  const [stats, setStats] = useState([]);
  const [streak, setStreak] = useState(0);
  const chartData = ["Easy", "Medium", "Hard"].map((level) => {
  const found = stats.find((s) => s._id === level);
  return {
    name: level,
    value: found ? found.count : 0,
  };
});
  const fetchStats = async () => {
  const res = await API.get("/problems/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  setStats(res.data);
};
const fetchStreak = async () => {
  const res = await API.get("/user/streak", {
    headers: { Authorization: `Bearer ${token}` },
  });
  setStreak(res.data.streak);
};

  // Fetch problems
  const fetchProblems = async () => {
    const res = await API.get("/problems", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProblems(res.data);
  };

 useEffect(() => {
  fetchProblems();
  fetchStats();
  fetchStreak();
}, []);


  // Add problem
 const handleAdd = async () => {
  await API.post("/problems", form, {
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchProblems();
  fetchStats(); 
};

    return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold mb-4">📊 DSA Dashboard</h1>

    <div className="mb-4 text-xl font-semibold text-orange-500">
      🔥 Streak: {streak} days
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      {["Easy", "Medium", "Hard"].map((level) => {
        const found = stats.find((s) => s._id === level);

        return (
          <div
            key={level}
            className={`p-4 rounded-lg shadow text-center font-bold ${
              level === "Easy"
                ? "bg-green-200"
                : level === "Medium"
                ? "bg-yellow-200"
                : "bg-red-200"
            }`}
          >
            <h3>{level}</h3>
            <p className="text-xl">{found ? found.count : 0}</p>
          </div>
        );
      })}
    </div>

    {/* Chart */}
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Progress Chart</h2>
      <PieChart width={300} height={300}>
        <Pie data={chartData} dataKey="value" outerRadius={100} label>
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.name === "Easy"
                  ? "green"
                  : entry.name === "Medium"
                  ? "orange"
                  : "red"
              }
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    {/* Add Problem */}
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3">Add Problem</h2>

      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2 rounded"
        onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Topic"
        onChange={(e) => setForm({ ...form, topic: e.target.value })}
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Problem
      </button>
    </div>

    {/* Problem List */}
    <div>
      <h2 className="text-xl font-semibold mb-3">Your Problems</h2>

      {problems.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded shadow mb-2"
        >
          <h3 className="font-bold">{p.title}</h3>
          <p>{p.difficulty} | {p.topic}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  </div>
);
}