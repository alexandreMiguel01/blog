require(`dotenv`).config();

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(express.json());

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors({
  origin: true 
}));

app.use(userRoutes);
app.use(`/posts`, postRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));