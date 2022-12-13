import { prisma } from "../../prisma";
import { Produto, ProdutoRepository } from "./produto-repository";

export class PrismaProdutoRepository implements ProdutoRepository {
  async findOne(id: string) {
    let query = `SELECT * FROM (
      SELECT 
      s.B1_COD,
      s.B1_DESC,
      s2.B0_PRV1,
      ROW_NUMBER() OVER (ORDER BY s.B1_COD) as Seq
      FROM SB1010 s 
      , SB0010 s2
      WHERE s.B1_COD = '${id}' AND  s2.B0_COD  = '${id}'
    )t
    WHERE Seq >= 1 AND Seq < 2  ORDER BY Seq`;

    //@ts-ignore
    const produto = (await prisma.$queryRawUnsafe(query))[0] as Produto;

    if (!produto) {
      return null;
    }

    //@ts-ignore
    delete produto["Seq"];

    return produto;
  }
}
