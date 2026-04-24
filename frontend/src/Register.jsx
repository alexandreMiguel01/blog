import { useState } from "react";

function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, age }),
    });

    if (res.ok) {
      alert("Conta criada!");
      goToLogin();
    } else {
      alert("Erro ao registrar");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Registrar</h2>

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

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

        <button className="btn btn-primary">Criar conta</button>

        <p className="switch">
          Já tem conta?{" "}
          <span onClick={goToLogin}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Register;