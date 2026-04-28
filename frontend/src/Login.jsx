import { useState } from "react";
import "./Login.css";

function Login({ setToken, setUserId, goToRegister }) { // 👈 AQUI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      setToken(data.token);
      setUserId(data.userId);
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>

        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn-primary">
          Entrar
        </button>

        <p className="switch">
          Não tem conta?{" "}
          <span onClick={goToRegister}>Registrar</span>
        </p>
      </form>
    </div>
  );
}

export default Login;