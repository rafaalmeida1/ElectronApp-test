const { getDb, saveDb } = require('../utils/db');

module.exports = function(ipcMain) {
  ipcMain.handle('veiculo:getAll', async () => {
    try {
      const db = getDb();
      const result = db.exec('SELECT * FROM Veiculos');
      return result[0]?.values.map((row) => ({
        id: row[0],
        marca: row[1],
        modelo: row[2],
        placa: row[3],
        ano: row[4],
        ClienteId: row[5],
        createdAt: row[6],
        updatedAt: row[7]
      })) || [];
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      throw error;
    }
  });

  ipcMain.handle('veiculo:create', async (event, veiculoData) => {
    try {
      const db = getDb();
      const now = new Date().toISOString();
      db.run('INSERT INTO Veiculos (marca, modelo, placa, ano, ClienteId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)', [
        veiculoData.marca,
        veiculoData.modelo,
        veiculoData.placa,
        veiculoData.ano,
        veiculoData.ClienteId,
        now,
        now
      ]);
      saveDb();
      const result = db.exec('SELECT last_insert_rowid() as id');
      const id = result[0].values[0][0];
      return { id, ...veiculoData, createdAt: now, updatedAt: now };
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      throw error;
    }
  });
};