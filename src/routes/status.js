const express = require('express');
const router = express.Router();
const StatusAgente = require('../models/StatusAgente');

router.post('/', async (req, res) => {
  try {
    const {
      empresaId,
      agenteId,
      filial,
      terminal,
      status,
      versaoAgente
    } = req.body;

    const update = {
      empresaId,
      agenteId,
      filial,
      terminal,
      status: {
        ...status,
        online: true,
        ultimoHeartbeat: new Date()
      },
      versaoAgente,
      updatedAt: new Date()
    };

    const doc = await StatusAgente.findOneAndUpdate(
      { agenteId },
      update,
      { upsert: true, new: true }
    );

    res.json({ ok: true, status: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar status' });
  }
});

module.exports = router;
