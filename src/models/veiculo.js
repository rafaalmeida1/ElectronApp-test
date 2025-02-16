const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Veiculo = sequelize.define('Veiculo', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ano: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Veiculo;