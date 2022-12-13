import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Cliente } from "../../../repositories/clienteRepository/cliente-repository";
import { PrismaClienteRepository } from "../../../repositories/clienteRepository/prisma-cliente-repository";
import { toJson } from "../../../util/toJSON";

const clienteDb = new PrismaClienteRepository();

const handler = nextConnect();

const nameSuggestions = async (req: NextApiRequest, res: NextApiResponse) => {
  const [chave, valor] = req.query.slug as string[];

  if (!chave || (chave != "nome" && chave != "telefone")) {
    return res.status(400).json({
      status: "error",
      message: "bad Request",
    });
  }

  if (!valor) {
    return res.status(400).json({
      status: "error",
      message: "missing value",
    });
  }

  let clientes;
  if (chave === "nome") {
    clientes = await clienteDb.findMany({
      ZR_NOME: valor.toUpperCase(),
    });
  }

  if (chave === "telefone") {
    clientes = await clienteDb.findMany({
      ZR_TEL: valor,
    });
  }

  if (!clientes) {
    return res.status(404).json({
      status: "not found",
    });
  }

  const result = clientes.map((cliente) => {
    const tempCliente = JSON.parse(toJson(cliente)) as Cliente;

    return {
      codigo: tempCliente.ZR_CODIGO,
      nome: tempCliente.ZR_NOME,
      telefone: tempCliente.ZR_TEL,
      endereco: tempCliente.ZR_END1,
      cep: tempCliente.ZR_CEP1,
      bairro: tempCliente.ZR_BAIRRO1,
      complemento: tempCliente.ZR_COMPL1,
      distancia: tempCliente.ZR_DISTANC,
    };
  });

  return res.status(200).json({
    status: "ok",
    data: {
      result,
    },
  });
};

handler.get(nameSuggestions);

export default handler;
