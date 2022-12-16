export interface Pedido {
  ZN_PEDIDO: string;
  ZN_ITEM: string;
  ZN_PRODUTO: string;
  ZN_DESCRI: string;
  ZN_QUANT: number;
  ZN_VRUNIT: number;
  ZN_VLRITEM: number;
}

export interface Cliente {
  ZR_NOME: string;
  ZR_END1: string;
  ZR_BAIRRO1: string;
  ZR_COMPL1: string;
  ZR_EST1: string;
  ZR_CEP1: string;
  ZR_TEL: string;
}

export interface Encomenda extends Cliente {
  ZM_FILIAL: string;
  ZM_TALAO: string;
  ZM_LOJA: string;
  ZM_PEDIDO: string;
  ZM_DENTR: string;
  ZM_DPEDID: string;
  ZM_HENTR: string;
  ZM_PESO: string;
  ZM_FORMATO: string;
  ZM_COR: string;
  ZM_LATERAL: string;
  ZM_IDADE: string;
  ZM_FENTR: "" | "01" | "02";
  ZM_VLRTOT: number;
  ZM_SINAL: number;
  ZM_RESTA: number;
  ZM_OBS: string;
  A3_NREDUZ: string;
  pedidos: Pedido[];
}

export interface EncomendaRepository {
  //Busca por codigo do pedido que retornará um unico pedido
  findOne: (codigo: string) => Promise<Encomenda | null>;

  //Busca pedidos do mês
  getEncomendas: (filial: string) => Promise<
    {
      ZM_FILIAL: "01" | "02";
      ZM_LOJA: "01" | "02";
      ZM_DENTR: string;
    }[]
  >;

  getEncomendasDia: (filial: string, dia: string) => Promise<Encomenda[]>;

  createEncomenda: (encomenda: {
    ZM_HPEDID: string;
    ZM_DPEDID: string;
    ZM_HMENTR: string;
    ZM_PESO: number;
    ZM_FORMATO: string;
    ZM_COR: string;
    ZM_LATERAL: string;
    ZM_IDADE: number;
    ZM_FENTR: "" | "01" | "02";
    ZM_FILIAL: string;
    ZM_TALAO: string;
    ZM_LOJA: string;
    ZM_PEDIDO: string;
    ZM_VLRTOT: number;
    ZM_SINAL: number;
    ZM_RESTA: number;
    ZM_DENTR: string;
    ZM_HENTR: string;
    ZM_OBS: string;
    ZM_VEND: string;
    cliente: Cliente;
    pedidos: Pedido[];
  }) => Promise<void>;

  updateEncomenda: (
    codigo: string,
    encomenda: {
      ZM_FILIAL: string;
      ZM_TALAO: string;
      ZM_DENTR: string;
      ZM_HENTR: string;
      ZM_PESO: number;
      ZM_FORMATO: string;
      ZM_COR: string;
      ZM_LATERAL: string;
      ZM_IDADE: number;
      ZM_FENTR: "" | "01" | "02";
    },
    pedidos: {
      ZN_ITEM: string;
      ZN_PRODUTO: string;
      ZN_DESCRI: string;
      ZN_QUANT: number;
      ZN_VRUNIT: number;
      ZN_VLRITEM: number;
    }[]
  ) => Promise<void>;
}
