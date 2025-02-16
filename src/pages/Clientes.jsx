import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', telefone: '', email: '' });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const clientesData = await window.api.cliente.getAll();
      setClientes(clientesData);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.api.cliente.create(novoCliente);
      setNovoCliente({ nome: '', telefone: '', email: '' });
      carregarClientes();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={novoCliente.telefone}
          onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={novoCliente.email}
          onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Adicionar Cliente</button>
      </form>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id} className="mb-2">
            {cliente.nome} - {cliente.telefone} - {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;