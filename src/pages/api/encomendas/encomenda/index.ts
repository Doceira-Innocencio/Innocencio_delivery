import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { PrismaClienteRepository } from "../../../../repositories/clienteRepository/prisma-cliente-repository";
import { PrismaEncomendaRepository } from "../../../../repositories/encomendaRepository/prisma-encomenda-repository";

const handler = nextConnect();

const usuarioDb = new PrismaClienteRepository();
const encomendaDb = new PrismaEncomendaRepository();

const NewEncomenda = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    filial,
    loja,
    codigo,
    dEntrega,
    hEntrega,
    peso,
    formato,
    cor,
    lateral,
    idade,
    pedidos,
    observacao,
    total,
    sinal,
    resta,
    balconista,
    codCliente,
    entrega,
    cliente,
  } = req.body;

  const dataAtual = new Date();
  const talao =
    `${dataAtual.getFullYear()}`.slice(-5, 1) +
    (parseInt(dataAtual.getMonth()) + 1);

  if (!codCliente) {
    await usuarioDb.createOne(filial, {
      ZR_BAIRRO1: cliente.bairro,
      ZR_CEP1: cliente.cep,
      ZR_DISTANC: cliente.distancia,
      ZR_COMPL1: cliente.complemento,
      ZR_END1: cliente.endereco,
      ZR_EST1: cliente.estado,
      ZR_FILIAL: filial,
      ZR_LOJA: loja,
      ZR_NOME: cliente.nome,
      ZR_TEL: cliente.telefone,
    });
    await encomendaDb.createEncomenda(
      {
        ZM_FILIAL: filial,
        ZM_LOJA: loja,
        ZM_TALAO: talao,
        ZM_DENTR: dEntrega,
        ZM_HENTR: hEntrega,
        ZM_PEDIDO: codigo,
        ZM_CLIENTE: cliente.codigo,
        ZM_PESO: peso,
        ZM_FORMATO: formato,
        ZM_COR: cor,
        ZM_LATERAL: lateral,
        ZM_IDADE: idade,
        ZM_VLRTOT: total,
        ZM_SINAL: sinal,
        ZM_RESTA: resta,
        ZM_OBS: observacao,
        ZM_FENTR: entrega,
        ZM_DPEDID: dataAtual
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join(""),
        ZM_HPEDID: `${dataAtual.getHours()}:${dataAtual.getMinutes()}:${dataAtual.getSeconds()}`,
        ZM_VEND: balconista,
      },
      pedidos
    );
  } else {
    await encomendaDb.createEncomenda(
      {
        ZM_FILIAL: filial,
        ZM_LOJA: loja,
        ZM_TALAO: talao,
        ZM_DENTR: dEntrega,
        ZM_HENTR: hEntrega,
        ZM_PEDIDO: codigo,
        ZM_CLIENTE: codCliente,
        ZM_PESO: peso,
        ZM_FORMATO: formato,
        ZM_COR: cor,
        ZM_LATERAL: lateral,
        ZM_IDADE: idade,
        ZM_VLRTOT: total,
        ZM_SINAL: sinal,
        ZM_RESTA: resta,
        ZM_OBS: observacao,
        ZM_FENTR: entrega,
        ZM_DPEDID: dataAtual
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join(""),
        ZM_HPEDID: `${dataAtual.getHours()}:${dataAtual.getMinutes()}:${dataAtual.getSeconds()}`,
        ZM_VEND: balconista,
      },
      pedidos
    );
  }

  return res.status(200).json({
    messagem: "Encomenda Criada Com Sucesso",
  });
};

handler.post(NewEncomenda);

export default handler;
