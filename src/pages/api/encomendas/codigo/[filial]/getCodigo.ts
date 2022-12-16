import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaEncomendaRepository } from "../../../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const encomendaDb = new PrismaEncomendaRepository();

const getCodigo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { filial } = req.query;

  if (filial != "01" && filial != "02") {
    return res.status(400).json({
      status: "bad Request",
    });
  }

  const codigo = await encomendaDb.getCodigo(filial as string);

  if (!codigo) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Nenhum codigo disponível encontrado!",
    });
  }

  await encomendaDb.lockCodigo(filial as string, codigo);

  return res.status(200).json({
    status: "ok",
    codigo,
  });
};

handler.put(getCodigo);

export default handler;
