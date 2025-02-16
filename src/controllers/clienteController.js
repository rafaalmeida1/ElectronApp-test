const { getDb, saveDb } = require('../utils/db');

module.exports = function(ipcMain) {
  ipcMain.handle('cliente:getAll', async () => {
    try {
      const db = getDb();
      const result = db.exec('SELECT * FROM Clientes');
      return result[0]?.values.map((row) => ({
        id: row[0],
        nome: row[1],
        telefone: row[2],
        email: row[3],
        createdAt: row[4],
        updatedAt: row[5]
      })) || [];
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  });

  ipcMain.handle('cliente:create', async (event, clienteData) => {
    try {
      const db = getDb();
      const now = new Date().toISOString();
      db.run('INSERT INTO Clientes (nome, telefone, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', [
        clienteData.nome,
        clienteData.telefone,
        clienteData.email,
        now,
        now
      ]);
      saveDb();
      const result = db.exec('SELECT last_insert_rowid() as id');
      const id = result[0].values[0][0];
      return { id, ...clienteData, createdAt: now, updatedAt: now };
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  });
};