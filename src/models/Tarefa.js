const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },

  nome: String,
  descricao: String,

  arquivo: {
    nome: String,
    local: String
  },

  execucao: {
    tipo: String,
    horarios: [String],
    intervaloMinutos: Number,
    intervaloDias: Number,
    diasSemana: [Number],
    diasMes: [Number]
  },

  escopo: {
    estados: [String],
    filiais: [String],
    terminais: [String]
  },

  ativo: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model(
  'Tarefa',
  TarefaSchema,
  'tarefas'
);
