/*

Context para armazenas todos os dados para preenche a fixa on view ou para enviar os dados para API
*/

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface RegistroEncomendaProviderProps {
  children: ReactNode;
}

interface RegistroEncomendaProps {
  registro: {
    encomendado: Date | string;
    balconista: string;
    pedido: number;
  };
  cliente: {
    nome: string;
    telefone: string;
    endereco?: string;
    nEndereco?: string;
    cep?: string;
    bairro?: string;
    complemento?: string;
    sinal?: number;
  };
  encomenda: {
    entrega: Date | string;
  };
  pedido: {
    peso: string;
    formato: string;
    cor: string;
    lateral: string;
    idade: string | number;
    codigo: number;
    descricao: string;
    qtd: number;
    unitario: number;
    observacao: string;
  };
  entrega: {
    qtd: number;
    unitario: number;
  };
}

interface RegistroEncomendaContextProps {
  registroEncomendaProps: RegistroEncomendaProps | {};
  setRegistroEncomendaProps: Dispatch<SetStateAction<RegistroEncomendaProps>>;
}

export const RegistroEncomendaContext =
  createContext<RegistroEncomendaContextProps>(
    {} as RegistroEncomendaContextProps
  );

export function RegistroEncomendaProvider({
  children,
}: RegistroEncomendaProviderProps) {
  const [registroEncomendaProps, setRegistroEncomendaProps] = useState({
    registro: {
      encomendado: "2022-12-11",
      balconista: "Wania",
      pedido: 776,
    },
    cliente: {
      nome: "Celso",
      telefone: "(11) 9 5499-2796",
      endereco: "Avenida Deputado Emílio Carlos",
      nEndereco: "495",
      cep: "02756-140",
      bairro: "Bairro do Limão",
      complemento: "",
      sinal: 50,
    },
    encomenda: {
      entrega: new Date(2022, 11, 14),
    },
    pedido: {
      peso: "2+",
      formato: "Quadrado",
      cor: "amarelo",
      lateral: "Choc. ralado ao leite",
      idade: "",
      codigo: 42,
      descricao: "BOLO FLORESTA NEGRA DE MORANGO",
      qtd: 2,
      unitario: 82,
      observacao: "ESC : Feliz aniversário",
    },
    entrega: {
      qtd: 10,
      unitario: 1,
    },
  } as RegistroEncomendaProps);

  return (
    <RegistroEncomendaContext.Provider
      value={{ registroEncomendaProps, setRegistroEncomendaProps }}
    >
      {children}
    </RegistroEncomendaContext.Provider>
  );
}
