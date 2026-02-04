import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Authorization";
import { useTranslation } from "react-i18next";

export function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

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

    localStorage.setItem("email", email);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    userContext?.setRole(data.role);

    navigate("/students");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col gap-10 p-8 rounded-3xl shadow-2xl w-100 h-100">
        <h1 className="text-3xl font-bold text-center">{t("Login")}</h1>
        <div className="flex flex-col">
          <label>{t("Username")}</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-300 p-3"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>{t("Password")}</label>
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
          {t("Login")}
        </button>
      </form>

      <div className="absolute right-0 top-0 mt-5 mr-5 bg-gray-300 rounded-2xl p-3 z-30">
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ch">中文</option>
        </select>
      </div>
    </div>
  );
}
