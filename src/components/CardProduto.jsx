import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: var(--bg-card);
  border-radius: var(--radius);
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: var(--shadow);
  margin: 16px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    background-color: var(--bg-hover);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Nome = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const Preco = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
`;

const Botao = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: var(--radius);
  color: white;
  background-color: ${(props) =>
    props.adicionado ? "var(--accent-regular)" : "var(--text-secondary)"};
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    background-color: ${(props) =>
      props.adicionado ? "var(--accent-light)" : "var(--accent-dark)"};
  }
`;

export default function CardProduto({ nome, preco, adicionado, onClick }) {
  return (
    <Card>
      <Nome>{nome}</Nome>
      <Preco>R$ {preco.toFixed(2)}</Preco>
      <Botao adicionado={adicionado} onClick={onClick}>
        {adicionado ? "Adicionado" : "Adicionar ao carrinho"}
      </Botao>
    </Card>
  );
}
