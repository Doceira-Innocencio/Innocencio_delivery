/*
Context que irá armazenar os dados da sessão do usuário como :
Unidade da Doceira Innocencio
*/

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface SectionsContextData {
  sectionProps: {
    unidade?: { nome: string; value: number };
  };
  setSectionProps: Dispatch<SetStateAction<{}>>;
}

export const SectionContext = createContext<SectionsContextData>(
  {} as SectionsContextData
);

interface SectionProviderProps {
  children: ReactNode;
}
export function SectionProvider({ children }: SectionProviderProps) {
  const [sectionProps, setSectionProps] = useState({});

  return (
    <SectionContext.Provider value={{ sectionProps, setSectionProps }}>
      {children}
    </SectionContext.Provider>
  );
}
