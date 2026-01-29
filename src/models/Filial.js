const mongoose = require("mongoose");

const FilialSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  codigo: {
    type: String,
    required: true
  },

  nome: {
    type: String,
    required: true
  },

  endereco: {
    estado: String,
    cidade: String
  },

  ativo: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Filial", FilialSchema, "filiais2");
