import React, { useState, useEffect } from 'react';

const Veiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [novoVeiculo, setNovoVeiculo] = useState({ marca: '', modelo: '', placa: '', ano: '', ClienteId: '' });

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      const veiculosData = await window.api.veiculo.getAll();
      setVeiculos(veiculosData);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.api.veiculo.create(novoVeiculo);
      setNovoVeiculo({ marca: '', modelo: '', placa: '', ano: '', ClienteId: '' });
      carregarVeiculos();
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Veículos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Marca"
          value={novoVeiculo.marca}
          onChange={(e) => setNovoVeiculo({ ...novoVeiculo, marca: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Modelo"
          value={novoVeiculo.modelo}
          onChange={(e) => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Placa"
          value={novoVeiculo.placa}
          onChange={(e) => setNovoVeiculo({ ...novoVeiculo, placa: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Ano"
          value={novoVeiculo.ano}
          onChange={(e) => setNovoVeiculo({ ...novoVeiculo, ano: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="ID do Cliente"
          value={novoVeiculo.ClienteId}
          onChange={(e) => setNovoVeiculo({ ...novoVeiculo, ClienteId: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Adicionar Veículo</button>
      </form>
      <ul>
        {veiculos.map((veiculo) => (
          <li key={veiculo.id} className="mb-2">
            {veiculo.marca} {veiculo.modelo} - Placa: {veiculo.placa} - Ano: {veiculo.ano} - Cliente ID: {veiculo.ClienteId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Veiculos;