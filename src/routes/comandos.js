const express = require("express");
const router = express.Router();
const Comando = require("../models/Comando");

/**
 * GET /comandos
 * Lista comandos ativos
 */
router.get("/", async (req, res) => {
  try {
    const comandos = await Comando.find({ ativo: true }).sort({ createdAt: -1 });
    res.json(comandos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar comandos" });
  }
});

/**
 * POST /comandos
 * Criar novo comando
 */
router.post("/", async (req, res) => {
  try {
    const comando = await Comando.create(req.body);
    res.status(201).json(comando);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

/**
 * PUT /comandos/:id
 * Editar comando
 */
router.put("/:id", async (req, res) => {
  try {
    const comando = await Comando.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!comando) {
      return res.status(404).json({ erro: "Comando não encontrado" });
    }

    res.json(comando);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar comando" });
  }
});

/**
 * PATCH /comandos/:id/ativo
 * Ativar / desativar (soft delete)
 */
router.patch("/:id/ativo", async (req, res) => {
  try {
    const comando = await Comando.findByIdAndUpdate(
      req.params.id,
      { ativo: req.body.ativo },
      { new: true }
    );

    if (!comando) {
      return res.status(404).json({ erro: "Comando não encontrado" });
    }

    res.json(comando);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao alterar status" });
  }
});

module.exports = router;
