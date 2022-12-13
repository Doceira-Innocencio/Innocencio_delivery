export interface Produto {
  B1_COD: string;
  B1_DESC: string;
  B0_PRV1: number;
}

export interface ProdutoRepository {
  findOne: (id: string) => Promise<Produto | null>;
}
