import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);

    window.location.href = "/dashboard"; // 👈 redirect
  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br /><br />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}