const express = require("express");
const router = express.Router();
const Arquivo = require("../models/Arquivo");

// GET /arquivos
router.get("/", async (req, res) => {
  try {
    const { estado, filial, terminal } = req.query;

    const filtro = { ativo: true };

    if (estado) {
      filtro.$or = [
        { "escopo.estados": estado },
        { "escopo.estados": { $size: 0 } }
      ];
    }

    if (filial) {
      filtro.$or = [
        ...(filtro.$or || []),
        { "escopo.filiais": filial },
        { "escopo.filiais": { $size: 0 } }
      ];
    }

    if (terminal) {
      filtro.$or = [
        ...(filtro.$or || []),
        { "escopo.terminais": terminal },
        { "escopo.terminais": { $size: 0 } }
      ];
    }

    const arquivos = await Arquivo.find(filtro).sort({
      "controle.build": -1
    });

    res.json(arquivos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar arquivos" });
  }
});

module.exports = router;
