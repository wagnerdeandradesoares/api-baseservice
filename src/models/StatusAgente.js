const mongoose = require('mongoose');

const StatusAgenteSchema = new mongoose.Schema({
  empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  agenteId: { type: String, required: true, unique: true },

  filial: {
    codigo: String,
    estado: String
  },

  terminal: {
    tipo: String,
    nome: String
  },

  status: {
    online: Boolean,
    ultimoHeartbeat: Date,
    ultimaExecucao: Date,
    resultado: String,
    mensagem: String
  },

  versaoAgente: String
}, {
  timestamps: true
});

module.exports = mongoose.model(
  'StatusAgente',
  StatusAgenteSchema,
  'status_agentes'
);
