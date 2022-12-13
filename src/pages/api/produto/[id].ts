import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaProdutoRepository } from "../../../repositories/produtoRepository/prisma-produto-repository";
import { Produto } from "../../../repositories/produtoRepository/produto-repository";
import { toJson } from "../../../util/toJSON";

const handler = nextConnect();

const produtoDb = new PrismaProdutoRepository();

const produtoById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "bad Request",
    });
  }

  const produto = await produtoDb.findOne(id as string);

  if (!produto) {
    return res.status(404).json({
      status: "not found",
    });
  }

  const result = JSON.parse(toJson(produto)) as Produto;

  return res.status(200).json({
    status: "ok",
    data: {
      codigo: result.B1_COD,
      descricao: result.B1_DESC,
      unitario: result.B0_PRV1,
    },
  });
};

handler.get(produtoById);

export default handler;
