import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaEncomendaRepository } from "../../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const encomendaDb = new PrismaEncomendaRepository();

const EncomendaById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "bad Request",
    });
  }

  try {
    const encomenda = await encomendaDb.findOne(id as string);

    return res.status(200).json({
      status: "ok",
      data: {
        cliente: encomenda.ZR_NOME,
        telefone: encomenda.ZR_TEL,
        dEntrega: encomenda.ZM_DENTR,
        hEntrega: encomenda.ZM_HENTR,
        peso: encomenda.ZM_PESO,
        formato: encomenda.ZM_FORMATO,
        cor: encomenda.ZM_COR,
        lateral: encomenda.ZM_LATERAL,
        idade: encomenda.ZM_IDADE,
        pedidos: encomenda.pedidos,
        total: encomenda.ZM_VLRTOT,
        sinal: encomenda.ZM_SINAL,
        resta: encomenda.ZM_RESTA,
        observacao: encomenda.ZM_OBS,
        endereco: encomenda.ZR_END1,
        cep: encomenda.ZR_CEP1,
        bairro: encomenda.ZR_BAIRRO1,
        complemento: encomenda.ZR_COMPL1,
        dPedido: encomenda.ZM_DPEDID,
        balconista: encomenda.A3_NREDUZ,
        codigo: encomenda.ZM_PEDIDO,
        entrega: encomenda.ZM_FENTR ? encomenda.ZM_FENTR : "entrega",
      },
    });
  } catch (e: any) {
    if (e.message.includes("Cannot set properties of undefined")) {
      return res.status(404).json({
        status: "not found",
      });
    }
  }
};

handler.get(EncomendaById);

export default handler;
