require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarMongo = require("./database");
const filiaisRoutes = require("./routes/filiais");
const comandosRoutes = require("./routes/comandos");
const tarefasRoutes = require("./routes/tarefas");
const statusRoutes = require('./routes/status');
const arquivosRoutes = require("./routes/arquivos");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/filiais", filiaisRoutes);
app.use("/arquivos", arquivosRoutes);
app.use("/comandos", comandosRoutes);
app.use("/tarefas", tarefasRoutes);
app.use('/status', statusRoutes);


// Conectar banco
conectarMongo();

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    nome: "API BaseService",
    versao: "1.0.0"
  });
});

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});



