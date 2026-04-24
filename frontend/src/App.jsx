import { useEffect, useState } from "react";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Register from "./Register";
import { getPosts, deletePost, createPost } from "./services/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isRegister, setIsRegister] = useState(false);
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchPosts() {
    try {
      setLoading(true);
      const data = await getPosts(token);
      setPosts(data.reverse());
    } catch {
      setMessage("Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  async function handleCreate() {
    if (!title || !content) {
      setMessage("Preencha todos os campos");
      return;
    }

    setLoading(true);

    const res = await createPost(token, { title, content });

    if (res.ok) {
      setMessage("✅ Post criado com sucesso!");
      setTitle("");
      setContent("");
      fetchPosts();
    } else {
      setMessage("❌ Erro ao criar post");
    }

    setLoading(false);
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (!confirm) return;

    const res = await deletePost(token, id);

    if (res.ok) {
      setMessage("🗑️ Post deletado");
      fetchPosts();
    } else {
      setMessage("Erro ao deletar");
    }
  }

  // 🔥 AQUI ESTÁ A CORREÇÃO
  if (!token) {
    return isRegister ? (
      <Register goToLogin={() => setIsRegister(false)} />
    ) : (
      <Login
        setToken={setToken}
        setUserId={setUserId}
        goToRegister={() => setIsRegister(true)}
      />
    );
  }

  return (
    <div className="container">
      <Navbar
        onLogout={() => {
          localStorage.clear();
          setToken(null);
        }}
      />

      <h1>📝 Meu Blog</h1>

      {message && <div className="message">{message}</div>}
      {loading && <p className="loading">Carregando...</p>}

      {/* 🔥 CRIAR POST */}
      <div className="card">
        <input
          className="input"
          placeholder="Título do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Escreva seu conteúdo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Post"}
        </button>
      </div>

      {/* 🔥 POSTS */}
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          userId={userId}
          token={token}
          onDelete={handleDelete}
          onUpdateSuccess={fetchPosts}
        />
      ))}
    </div>
  );
}

export default App;