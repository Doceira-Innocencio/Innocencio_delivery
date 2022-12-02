/*

Context que irá armazenar os dados do módulo de Registro de Encomenda
*/

import { createContext, useState } from "react";

export const RegistroClienteContext = createContext({});

export function RegistroClienteProvider({ children }) {
  const [registroClienteProps, setRegistroClienteProps] = useState({});

  return (
    <RegistroClienteContext.Provider
      value={{ registroClienteProps, setRegistroClienteProps }}
    >
      {children}
    </RegistroClienteContext.Provider>
  );
}
