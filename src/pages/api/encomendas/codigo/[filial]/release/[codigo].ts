import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaEncomendaRepository } from "../../../../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const encomendaDb = new PrismaEncomendaRepository();

const releaseCodigo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { filial, codigo } = req.query;
  await encomendaDb.releaseCodigo(filial as string, codigo as string);

  return res.status(200).json({
    status: "ok",
  });
};

handler.put(releaseCodigo);

export default handler;
