const Cliente = require('./cliente');
const Veiculo = require('./veiculo');

Cliente.hasMany(Veiculo);
Veiculo.belongsTo(Cliente);

module.exports = { Cliente, Veiculo };