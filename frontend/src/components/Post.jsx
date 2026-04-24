import { useState } from "react";
import { updatePost } from "../services/api";

function Post({ post, userId, onDelete, token, onUpdateSuccess }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  async function handleUpdate() {
    const res = await updatePost(token, post.id, { title, content });

    if (res.ok) {
      setEditing(false);
      onUpdateSuccess();
    } else {
      alert("Erro ao atualizar");
    }
  }

  return (
    <div className="card post">
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />

          <button className="btn btn-save" onClick={handleUpdate}>Salvar</button>
          <button className="btn btn-cancel" onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* 🔥 INFO EXTRA */}
          <small className="meta">
            {post.author} • Post #{post.id}
          </small>

          {String(post.userId) === String(userId) && (
            <div className="actions">
              <button className="btn btn-edit" onClick={() => setEditing(true)}>
                Editar
              </button>

              <button className="btn btn-delete" onClick={() => onDelete(post.id)}>
                Deletar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Post;