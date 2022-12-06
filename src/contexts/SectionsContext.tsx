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

interface SectionProviderProps {
  children: ReactNode;
}

interface SectionProps {
  mode: "INICIO" | "NOVO" | "BUSCA";
}

interface SectionContextProps {
  sectionProps: SectionProps;
  setSectionProps: Dispatch<SetStateAction<SectionProps>>;
  setSectionMode: (mode: "INICIO" | "NOVO" | "BUSCA") => void;
}

export const SectionContext = createContext<SectionContextProps>(
  {} as SectionContextProps
);

export function SectionProvider({ children }: SectionProviderProps) {
  const [sectionProps, setSectionProps] = useState({
    mode: "INICIO",
  } as SectionProps);

  function setSectionMode(modeVAL: "INICIO" | "NOVO" | "BUSCA") {
    setSectionProps({ ...sectionProps, mode: modeVAL });
  }

  return (
    <SectionContext.Provider
      value={{ sectionProps, setSectionProps, setSectionMode }}
    >
      {children}
    </SectionContext.Provider>
  );
}
