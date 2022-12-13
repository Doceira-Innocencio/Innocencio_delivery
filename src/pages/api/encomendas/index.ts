import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaEncomendaRepository } from "../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const encomendaDb = new PrismaEncomendaRepository();

const encomendas = async (req: NextApiRequest, res: NextApiResponse) => {
  const { filial } = req.query;

  if (filial && filial != "01" && filial != "02") {
    return res.status(404).json({
      status: "bad Request",
    });
  }

  const encomendas = (await encomendaDb.getEncomendas(filial as string)).map(
    (encomendasDia) => encomendasDia.ZM_DENTR
  );

  return res.status(200).json({
    status: "ok",
    data: {
      encomendas,
    },
  });
};

handler.get(encomendas);

export default handler;
