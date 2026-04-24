const API_URL = "http://localhost:3000";

// 🔐 GET POSTS
export async function getPosts(token) {
  const res = await fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// ➕ CREATE POST
export async function createPost(token, data) {
  return fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// 🗑️ DELETE POST
export async function deletePost(token, id) {
  return fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updatePost(token, id, data) {
  return fetch(`http://localhost:3000/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}