const express = require("express");
const router = express.Router();
const Filial = require("../models/Filial");

// GET /filiais
router.get("/", async (req, res) => {
  try {
    const { estado, ativo } = req.query;

    const filtro = {};

    if (ativo !== undefined) {
      filtro.ativo = ativo === "true";
    }

    if (estado) {
      filtro["endereco.estado"] = estado;
    }

    const filiais = await Filial.find(filtro).sort({
      codigo: 1
    });

    res.json(filiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar filiais" });
  }
});

module.exports = router;
