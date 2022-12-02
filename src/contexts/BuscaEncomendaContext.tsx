/*

Context que irá armazenar os dados do módulo de Busca de Encomenda
Todas as alterações feitas no modulo serão armazenadas aqui
*/

import { createContext, useState } from "react";

export const BuscaEncomenda = createContext({});

export function BuscaEncomendaProvider({ children }) {
  const [buscaEncomendaProps, setBuscaEncomendaProps] = useState({});

  return (
    <BuscaEncomenda.Provider
      value={{ buscaEncomendaProps, setBuscaEncomendaProps }}
    >
      {children}
    </BuscaEncomenda.Provider>
  );
}
