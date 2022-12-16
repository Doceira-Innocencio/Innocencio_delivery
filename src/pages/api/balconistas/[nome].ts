import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Cliente } from "../../../repositories/clienteRepository/cliente-repository";
import { PrismaEncomendaRepository } from "../../../repositories/encomendaRepository/prisma-encomenda-repository";
import { toJson } from "../../../util/toJSON";

const encomendaDb = new PrismaEncomendaRepository();

const handler = nextConnect();

const nameSuggestions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome } = req.query;

  const resultado = await encomendaDb.findBalconista(nome as string);

  return res.status(200).json({
    status: "ok",
    data: {
      resultado,
    },
  });
};

handler.get(nameSuggestions);

export default handler;
