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
  filial: "" | "01" | "02";
}

interface SectionContextProps {
  sectionProps: SectionProps;
  setSectionProps: Dispatch<SetStateAction<SectionProps>>;
  setSectionMode: (mode: "INICIO" | "NOVO" | "BUSCA") => void;
  setFilial: (filial: "01" | "02") => void;
}

export const SectionContext = createContext<SectionContextProps>(
  {} as SectionContextProps
);

export function SectionProvider({ children }: SectionProviderProps) {
  const [sectionProps, setSectionProps] = useState({
    mode: "INICIO",
    filial: "",
  } as SectionProps);

  function setSectionMode(modeVAL: "INICIO" | "NOVO" | "BUSCA") {
    setSectionProps({ ...sectionProps, mode: modeVAL });
  }

  function setFilial(filialSelected: "01" | "02") {
    setSectionProps({ ...setSectionProps, filial: filialSelected });
  }

  return (
    <SectionContext.Provider
      value={{ sectionProps, setSectionProps, setSectionMode, setFilial }}
    >
      {children}
    </SectionContext.Provider>
  );
}
