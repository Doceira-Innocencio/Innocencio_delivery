/*

Context que irá armazenar os dados do módulo de Registro de Encomenda
*/

import { createContext, useState } from "react";

export const RegistroEncomendaContext = createContext({});

export function RegistroEncomendaProvider({ children }) {
  const [registroEncomendaProps, setRegistroEncomendaProps] = useState({});

  return (
    <RegistroEncomendaContext.Provider
      value={{ registroEncomendaProps, setRegistroEncomendaProps }}
    >
      {children}
    </RegistroEncomendaContext.Provider>
  );
}
