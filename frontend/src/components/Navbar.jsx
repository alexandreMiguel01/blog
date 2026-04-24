function Navbar({ onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#333",
        color: "#fff",
      }}
    >
      <h2>Meu Blog</h2>

      <button
        onClick={onLogout}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;