export interface Cliente {
  ZR_FILIAL: "01" | "02";
  ZR_CODIGO: string;
  ZR_LOJA: "01" | "02";
  ZR_NOME: string;
  ZR_END1: string;
  ZR_BAIRRO1: string;
  ZR_COMPL1: string;
  ZR_EST1: string;
  ZR_CEP1: string;
  ZR_TEL: string;
  ZR_DISTANC: number;
}

export interface clienteRepository {
  findMany: ({}: {
    ZR_NOME?: string;
    ZR_TEL?: string;
  }) => Promise<Cliente[] | null>;

  createOne: (data: Cliente) => Promise<void>;
}
