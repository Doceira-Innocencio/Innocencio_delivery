import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaClienteRepository } from "../../../../repositories/clienteRepository/prisma-cliente-repository";
import { PrismaEncomendaRepository } from "../../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const clienteDb = new PrismaClienteRepository();
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

const UpdateEncomendaById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const { filial, encomenda, cliente, pedidos } = req.body;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "bad Request",
    });
  }

  if (encomenda) {
    await encomendaDb.updateEncomenda(id, {
      ZM_DENTR: encomenda.dEntrega,
      ZM_HENTR: encomenda.hEntrega,
      ZM_PESO: encomenda.peso,
      ZM_FORMATO: encomenda.formato,
      ZM_COR: encomenda.cor,
      ZM_OBS: encomenda.observacao,
      ZM_LATERAL: encomenda.lateral,
      ZM_IDADE: encomenda.idade,
      ZM_FENTR: encomenda.entrega,
      ZM_VLRTOT: encomenda.total,
      ZM_SINAL: encomenda.sinal,
      ZM_RESTA: encomenda.resta,
    });
  }

  if (pedidos) {
    await encomendaDb.updatePedidosEncomenda(
      id,
      pedidos.map((pedido) => {
        return {
          ZM_FILIAL: filial,
          ZM_TALAO: "010",
          ZN_ITEM: pedido.item,
          ZN_PRODUTO: pedido.produto,
          ZN_DESCRI: pedido.descricao,
          ZN_QUANT: pedido.qtd,
          ZN_VRUNIT: pedido.unitario,
          ZN_VLRITEM: pedido.total,
        };
      })
    );
  }

  if (cliente) {
    await clienteDb.update({
      ZR_CODIGO: cliente.codigo,
      ZR_END1: cliente.endereco,
      ZR_CEP1: cliente.cep,
      ZR_BAIRRO1: cliente.bairro,
      ZR_COMPL1: cliente.complemento,
      ZR_TEL: cliente.telefone,
    });
  }

  return res.status(200).json({
    status: "ok",
  });
};

handler.get(EncomendaById);

handler.patch(UpdateEncomendaById);

export default handler;
