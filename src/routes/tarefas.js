const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

router.get('/', async (req, res) => {
  try {
    const {
      empresaId,
      estado,
      filial,
      terminal
    } = req.query;

    const filtro = {
      empresaId,
      ativo: true,
      $and: [
        {
          $or: [
            { 'escopo.estados': { $size: 0 } },
            { 'escopo.estados': estado }
          ]
        },
        {
          $or: [
            { 'escopo.filiais': { $size: 0 } },
            { 'escopo.filiais': filial }
          ]
        },
        {
          $or: [
            { 'escopo.terminais': { $size: 0 } },
            { 'escopo.terminais': terminal }
          ]
        }
      ]
    };

    const tarefas = await Tarefa.find(filtro);

    res.json(tarefas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
});

module.exports = router;
