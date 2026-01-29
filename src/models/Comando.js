const mongoose = require("mongoose");

const ComandoSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  tipo: {
    type: String,
    enum: ["popup", "execucao", "config"],
    required: true
  },

  titulo: String,
  mensagem: String,

  escopo: {
    estados: [String],
    filiais: [String],
    terminais: [String]
  },

  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: "comando"
});

module.exports = mongoose.model("Comandos", ComandoSchema);
