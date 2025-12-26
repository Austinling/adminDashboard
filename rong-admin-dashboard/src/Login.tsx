import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Login Failed Please Try Again");
      return;
    }

    localStorage.setItem("token", data.token);

    navigate("/students");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col gap-10 p-8 rounded-3xl shadow-2xl w-100 h-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="flex flex-col">
          <label>Username</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-gray-300 p-3"
          ></input>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-red-400 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
