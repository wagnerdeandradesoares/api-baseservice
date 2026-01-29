const mongoose = require("mongoose");

const ArquivoSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  nome: String,
  descricao: String,
  tipo: String,

  download: {
    url: String,
    destino: String
  },

  controle: {
    versao: String,
    build: Number,
    obrigatorio: Boolean
  },

  escopo: {
    estados: [String],
    filiais: [String],
    terminais: [String]
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

module.exports = mongoose.model("Arquivo", ArquivoSchema, "arquivos");
