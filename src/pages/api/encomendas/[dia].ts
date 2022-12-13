import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaEncomendaRepository } from "../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const encomendaDb = new PrismaEncomendaRepository();

const encomendasDia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dia, filial } = req.query as { dia: string; filial: string };

  if (!dia.match(/^\d{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/g)) {
    return res.status(400).json({
      status: "bad Request",
    });
  }
  const encomendas = (await encomendaDb.getEncomendasDia(filial, dia)).map(
    (encomenda) => {
      return {
        cliente: encomenda.ZR_NOME,
        telefone: encomenda.ZR_TEL,
        dEntrega: encomenda.ZM_DENTR,
        hEntrega: encomenda.ZM_HENTR,
        peso: encomenda.ZM_PESO,
        formato: encomenda.ZM_FORMATO,
        cor: encomenda.ZM_COR,
        lateral: encomenda.ZM_LATERAL,
        idade: encomenda.ZM_IDADE,
        total: encomenda.ZM_VLRTOT,
        sinal: encomenda.ZM_SINAL,
        resta: encomenda.ZM_RESTA,
        endereco: encomenda.ZR_END1,
        cep: encomenda.ZR_CEP1,
        bairro: encomenda.ZR_BAIRRO1,
        complemento: encomenda.ZR_COMPL1,
        dPedido: encomenda.ZM_DPEDID,
        balconista: encomenda.A3_NREDUZ,
        codigo: encomenda.ZM_PEDIDO,
        entrega: encomenda.ZM_FENTR ? encomenda.ZM_FENTR : "entrega",
      };
    }
  );

  return res.status(200).json({
    status: "ok",
    data: {
      encomendas,
    },
  });
};

handler.get(encomendasDia);

export default handler;
