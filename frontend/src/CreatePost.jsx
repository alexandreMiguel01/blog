import { useState } from "react";

function CreatePost({ token, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleCreate() {
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (data.id) {
      alert("Post criado!");
      setTitle("");
      setContent("");
      onPostCreated();
    } else {
      alert("Erro ao criar post");
    }
  }

  return (
    <div>
      <h2>Criar Post</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleCreate}>Criar</button>
    </div>
  );
}

export default CreatePost;