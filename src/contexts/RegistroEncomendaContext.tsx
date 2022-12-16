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
import { api } from "../util/api";

interface RegistroEncomendaProviderProps {
  children: ReactNode;
}

interface RegistroEncomendaProps {
  cadastroContext: {
    dateSelected: string;
    codigoEncomenda: string;
    concluivel: boolean;
    clienteAutoComplete: {
      nome: string;
      telefone: string;
      endereco: string;
      nEndereco: string;
      cep: string;
      bairro: string;
      complemento: string;
      estado: string;
    };
  };
  registro: {
    encomendado: Date | string;
    balconista: string;
    nBalconista: string;
    pedido: string;
  };
  cliente: {
    nome: string;
    telefone: string;
    endereco?: string;
    nEndereco?: string;
    cep?: string;
    bairro?: string;
    complemento?: string;
    estado?: string;
    distancia: number;
  };
  encomenda: {
    dEntrega: string;
    hEntrega: string;
    peso: number;
    formato: string;
    cor: string;
    lateral: string;
    idade: number;
    total: number;
    sinal: number;
    resta: number;
    observacao: string;
    pedidos: Pedido[];
    entrega: "00" | "01" | "02";
  };
}

interface RegistroEncomendaContextProps {
  registroEncomendaProps: RegistroEncomendaProps;
  setRegistroEncomendaProps: Dispatch<SetStateAction<RegistroEncomendaProps>>;
  fetchNewEncomenda: (codigoEncomenda: string) => Promise<void>;
  resetForm: () => void;
}

type Pedido = {
  codigo: string;
  item: string;
  produto: string;
  descricao: string;
  qtd: number;
  unitario: number;
  vItem: number;
};

type apiEncomendaAtt = {
  cliente: string;
  telefone: string;
  dEntrega: string;
  hEntrega: string;
  peso: number;
  formato: string;
  cor: string;
  lateral: string;
  idade: number;
  endereco: string;
  cep: string;
  bairro: string;
  complemento: string;
  dPedido: string;
  balconista: string;
  codigo: string;
  observacao: string;

  entrega: "00" | "01" | "02";
  total: number;
  sinal: number;
  resta: number;
  pedidos: Pedido[];
};

export const RegistroEncomendaContext =
  createContext<RegistroEncomendaContextProps>(
    {} as RegistroEncomendaContextProps
  );

export function RegistroEncomendaProvider({
  children,
}: RegistroEncomendaProviderProps) {
  const [registroEncomendaProps, setRegistroEncomendaProps] = useState({
    cadastroContext: {
      dateSelected: "",
      codigoEncomenda: "",
      concluivel: false,
      clienteAutoComplete: {
        nome: "",
        telefone: "",
        endereco: "",
        nEndereco: "",
        cep: "",
        bairro: "",
        complemento: "",
      },
    },
    registro: {
      encomendado: "",
      balconista: "",
      pedido: "",
    },
    cliente: {
      nome: "",
      telefone: "",
      endereco: "",
      nEndereco: "",
      cep: "",
      bairro: "",
      complemento: "",
      estado: "",
    },
    encomenda: {
      dEntrega: "",
      hEntrega: "",
      cor: "",
      formato: "",
      idade: 0,
      lateral: "",
      peso: 0,
      resta: 0,
      sinal: 0,
      total: 0,
      observacao: "",
      pedidos: [
        {
          codigo: "",
          item: "",
          produto: "",
          descricao: "",
          qtd: 0,
          unitario: 0,
          vItem: 0,
        },
      ],
    },
  } as RegistroEncomendaProps);

  async function fetchNewEncomenda(codigoEncomenda: string) {
    const { data } = await api.get(
      `/api/encomendas/encomenda/${codigoEncomenda}`
    );

    const dadosEncomenda = data.data as apiEncomendaAtt;

    setRegistroEncomendaProps({
      ...registroEncomendaProps,
      cliente: {
        nome: dadosEncomenda.cliente.trim(),
        telefone: dadosEncomenda.telefone,
        bairro: dadosEncomenda.bairro,
        cep: dadosEncomenda.cep,
        complemento: dadosEncomenda.complemento,
        nEndereco: dadosEncomenda.endereco.split(",")[1],
        endereco: dadosEncomenda.endereco,
      },
      encomenda: {
        cor: dadosEncomenda.cor,
        dEntrega: dadosEncomenda.dEntrega,
        formato: dadosEncomenda.formato,
        idade: dadosEncomenda.idade,
        hEntrega: dadosEncomenda.hEntrega,
        lateral: dadosEncomenda.lateral,
        observacao: dadosEncomenda.observacao,
        pedidos: dadosEncomenda.pedidos,
        peso: dadosEncomenda.peso,
        sinal: dadosEncomenda.sinal,
        resta: dadosEncomenda.resta,
        total: dadosEncomenda.total,
      },
      registro: {
        encomendado: dadosEncomenda.dPedido,
        balconista: dadosEncomenda.balconista.trim(),
        pedido: dadosEncomenda.codigo,
      },
    });
  }

  return (
    <RegistroEncomendaContext.Provider
      value={{
        registroEncomendaProps,
        setRegistroEncomendaProps,
        fetchNewEncomenda,
        resetForm() {
          setRegistroEncomendaProps({
            cadastroContext: {
              dateSelected: "",
              codigoEncomenda: "",
              clienteAutoComplete: {
                nome: "",
                telefone: "",
                endereco: "",
                nEndereco: "",
                cep: "",
                bairro: "",
                complemento: "",
              },
            },
            registro: {
              encomendado: "",
              balconista: "",
              pedido: "",
            },
            cliente: {
              nome: "",
              telefone: "",
              endereco: "",
              nEndereco: "",
              cep: "",
              bairro: "",
              complemento: "",
            },
            encomenda: {
              dEntrega: "",
              hEntrega: "",
              cor: "",
              formato: "",
              idade: 0,
              lateral: "",
              peso: 0,
              resta: 0,
              sinal: 0,
              total: 0,
              observacao: "",
              pedidos: [
                {
                  codigo: "",
                  item: "",
                  produto: "",
                  descricao: "",
                  qtd: 0,
                  unitario: 0,
                  vItem: 0,
                },
              ],
            },
          });
        },
      }}
    >
      {children}
    </RegistroEncomendaContext.Provider>
  );
}
