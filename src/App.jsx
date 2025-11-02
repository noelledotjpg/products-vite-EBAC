import React, { useState, useMemo } from "react";
import styled from "styled-components";
import CardProduto from "./components/CardProduto";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
`;

const InputBusca = styled.input`
  padding: 10px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  width: 250px;
  background-color: var(--bg-card);
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SelectOrdenacao = styled.select`
  padding: 10px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background-color: var(--bg-card);
  color: var(--text-primary);
`;

const GridProdutos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
`;

const Titulo = styled.h1`
  color: var(--accent);
  margin-bottom: 20px;
`;

const produtosIniciais = [
  { id: 1, nome: "Camiseta", preco: 59.9 },
  { id: 2, nome: "Tênis", preco: 199.9 },
  { id: 3, nome: "Boné", preco: 39.9 },
  { id: 4, nome: "Jaqueta", preco: 249.9 },
  { id: 5, nome: "Relógio", preco: 349.9 },
  { id: 6, nome: "Calça Jeans", preco: 179.9 },
];

const corrigirTexto = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export default function App() {
  const [adicionados, setAdicionados] = useState({});
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("az");

  const toggleAdicionado = (id) => {
    setAdicionados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const produtosFiltrados = useMemo(() => {
    const termo = corrigirTexto(busca);
    let filtrados = produtosIniciais.filter((p) =>
      corrigirTexto(p.nome).includes(termo)
    );

    switch (ordenacao) {
      case "az":
        filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "za":
        filtrados.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case "preco-asc":
        filtrados.sort((a, b) => a.preco - b.preco);
        break;
      case "preco-desc":
        filtrados.sort((a, b) => b.preco - a.preco);
        break;
      default:
        break;
    }

    return filtrados;
  }, [busca, ordenacao]);

  return (
    <Container>
      <Titulo>LOJAS LOJA</Titulo>

      <Filtros>
        <InputBusca
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <SelectOrdenacao
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="az">Ordenar: A-Z</option>
          <option value="za">Ordenar: Z-A</option>
          <option value="preco-asc">Preço: menor - maior</option>
          <option value="preco-desc">Preço: maior - menor</option>
        </SelectOrdenacao>
      </Filtros>

      <GridProdutos>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <CardProduto
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              adicionado={!!adicionados[produto.id]}
              onClick={() => toggleAdicionado(produto.id)}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </GridProdutos>
    </Container>
  );
}
