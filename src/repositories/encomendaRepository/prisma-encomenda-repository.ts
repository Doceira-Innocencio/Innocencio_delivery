import { prisma } from "../../prisma";
import {
  Cliente,
  Encomenda,
  EncomendaRepository,
  Pedido,
} from "./encomenda-repository";

type EncomendasMes = {
  ZM_FILIAL: "01" | "02";
  ZM_LOJA: "01" | "02";
  ZM_DENTR: string;
};

type NewEncomendaParams = {
  ZM_HPEDID: string;
  ZM_DPEDID: string;
  ZM_HMENTR: string;
  ZM_PESO: number;
  ZM_FORMATO: string;
  ZM_COR: string;
  ZM_LATERAL: string;
  ZM_IDADE: number;
  ZM_FENTR: "" | "01" | "02";
  ZM_FILIAL: string;
  ZM_TALAO: string;
  ZM_LOJA: string;
  ZM_PEDIDO: string;
  ZM_VLRTOT: number;
  ZM_SINAL: number;
  ZM_RESTA: number;
  ZM_DENTR: string;
  ZM_HENTR: string;
  ZM_OBS: string;
  ZM_VEND: string;
  ZM_CLIENTE: string;
  cliente: Cliente;
  pedidos: Pedido[];
};

export class PrismaEncomendaRepository implements EncomendaRepository {
  async findOne(codigo: string) {
    let query;

    query = `
    SELECT DISTINCT *
    FROM (
	  SELECT 
	  encomendas.ZM_PEDIDO,
    encomendas.ZM_FENTR,
	  encomendas.ZM_DENTR,
    encomendas.ZM_DPEDID,
	  encomendas.ZM_HENTR,
	  encomendas.ZM_PESO,
	  encomendas.ZM_FORMATO,
	  encomendas.ZM_COR,
	  encomendas.ZM_LATERAL,
	  encomendas.ZM_IDADE,
	  encomendas.ZM_CLIENTE ,
	  clientes.ZR_CODIGO ,
	  clientes.ZR_NOME,
	  clientes.ZR_END1,
	  clientes.ZR_BAIRRO1,
	  clientes.ZR_COMPL1,
	  clientes.ZR_EST1,
	  clientes.ZR_CEP1,
	  atendentes.A3_NREDUZ,
	  clientes.ZR_TEL
   FROM 
  	SZM010 encomendas, 
  	SZR010 clientes,
  	SA3010 atendentes
  WHERE 
  	encomendas.ZM_PEDIDO = '${codigo}' and 
  	clientes.ZR_CODIGO = encomendas.ZM_CLIENTE AND 
	  encomendas.ZM_VEND = atendentes.A3_COD
	  )T`;

    const [encomenda] = (await prisma.$queryRawUnsafe(query)) as Encomenda[];

    query = `SELECT 
    ZN_PEDIDO,
    ZN_ITEM,
    ZN_PRODUTO,
    ZN_DESCRI,
    ZN_QUANT,
    ZN_VRUNIT,
    ZN_VLRITEM
  FROM 
    SZN010 
  WHERE 
    ZN_PEDIDO = '${codigo}'
  ORDER BY ZN_ITEM `;

    const pedidosEncomenda = (await prisma.$queryRawUnsafe(query)) as Pedido[];

    encomenda["pedidos"] = pedidosEncomenda;

    return encomenda;
  }

  async getEncomendas(filial: string) {
    const query = `SELECT DISTINCT *
    FROM (
      SELECT 
      ZM_FILIAL, ZM_LOJA , ZM_DENTR  
    FROM 
      SZM010 
    WHERE 
    ${filial ? `ZM_FILIAL = ${filial} AND` : ""}
      (SELECT convert(DATETIME , ZM_DENTR, 112)) 
      BETWEEN dateadd(DD,-1,getdate()) AND dateadd(MM,+1,getdate())
      )T`;

    const encomendas = (await prisma.$queryRawUnsafe(query)) as EncomendasMes[];

    return encomendas;
  }

  async getEncomendasDia(filial: string, dia: string) {
    const query = `
    SELECT DISTINCT *
    FROM (
      SELECT 
      clientes.ZR_NOME,
      clientes.ZR_TEL,
      encomendas.ZM_DENTR,
      encomendas.ZM_FENTR,
      encomendas.ZM_HENTR,
      encomendas.ZM_PESO,
      encomendas.ZM_FORMATO,
      encomendas.ZM_COR,
      encomendas.ZM_LATERAL,
      encomendas.ZM_IDADE,
      clientes.ZR_END1,
      clientes.ZR_CEP1,
      clientes.ZR_BAIRRO1,
      clientes.ZR_COMPL1,
      encomendas.ZM_DPEDID,
      atendentes.A3_NREDUZ, 
      encomendas.ZM_PEDIDO
    FROM 
      SZM010 encomendas
      INNER JOIN SZR010 AS clientes 
        ON encomendas.ZM_CLIENTE = clientes.ZR_CODIGO 
      INNER JOIN SA3010 AS atendentes
        ON encomendas.ZM_VEND = atendentes.A3_COD
    WHERE 
    ${filial ? `encomendas.ZM_FILIAL = '${filial}' and` : ""}
      encomendas.ZM_DENTR = '${dia}'
      )T`;

    const encomendas = (await prisma.$queryRawUnsafe(query)) as Encomenda[];

    return encomendas;
  }

  async createEncomenda(encomenda: NewEncomendaParams, pedidos: Pedido[]) {
    let query = `
    INSERT INTO SZM010  
	(
		ZM_FILIAL,
		ZM_TALAO,
		ZM_PEDIDO,
    ZM_DENTR,
    ZM_HENTR,
		ZM_CLIENTE,
		ZM_LOJA,
		ZM_PESO,
		ZM_FORMATO,
		ZM_COR,
		ZM_LATERAL,
		ZM_IDADE,
		ZM_VLRTOT,
		ZM_SINAL,
		ZM_RESTA,
		ZM_DPEDID,
    ZM_HPEDID,
		ZM_VEND,
		ZM_FENTR,
		ZM_OBS,
    R_E_C_N_O_
	) 
	VALUES
	(
		'${encomenda.ZM_FILIAL}',
		'${encomenda.ZM_TALAO}',
		'${encomenda.ZM_PEDIDO}',
    '${encomenda.ZM_DENTR}',
    '${encomenda.ZM_HENTR}',
		'${encomenda.ZM_CLIENTE}',
		'${encomenda.ZM_LOJA}',
		${encomenda.ZM_PESO},
		'${encomenda.ZM_FORMATO}',
		'${encomenda.ZM_COR}',
		'${encomenda.ZM_LATERAL}',
		${encomenda.ZM_IDADE},
		${encomenda.ZM_VLRTOT},
		${encomenda.ZM_SINAL},
		${encomenda.ZM_RESTA},
		'${encomenda.ZM_DPEDID}',
    '${encomenda.ZM_HPEDID}',
		'${encomenda.ZM_VEND}',
		'${encomenda.ZM_FENTR}',
		'${encomenda.ZM_OBS}',
    (SELECT TOP 1 s.R_E_C_N_O_
			from SZM010 s
			order by s.R_E_C_N_O_ DESC)+1
	);
    `;

    await prisma.$queryRawUnsafe(query);

    query = `INSERT INTO SZN010  
    (
      ZN_FILIAL,
      ZN_TALAO,
      ZN_PEDIDO,
      ZN_ITEM,
      ZN_PRODUTO,
      ZN_DESCRI,
      ZN_QUANT,
      ZN_VRUNIT,
      ZN_VLRITEM,
      R_E_C_N_O_
    ) 
    VALUES
    ${pedidos.map((pedido) => {
      return `(
        '${encomenda.ZM_FILIAL}',
        '${encomenda.ZM_TALAO}',
        '${encomenda.ZM_PEDIDO}',
        '${pedido.item}',
        '${pedido.produto}',
        '${pedido.descricao}',
        ${pedido.qtd},
        ${pedido.unitario},
        ${pedido.total},
        (SELECT TOP 1 s.R_E_C_N_O_
          from SZN010 s
          order by s.R_E_C_N_O_ DESC)+1
      )`;
    })}
    ;`;

    await prisma.$queryRawUnsafe(query);
  }

  async updateEncomenda(
    codigo: string,
    encomenda: {
      ZM_FILIAL: string;
      ZM_TALAO: string;
      ZM_DENTR: string;
      ZM_HENTR: string;
      ZM_PESO: number;
      ZM_FORMATO: string;
      ZM_COR: string;
      ZM_LATERAL: string;
      ZM_IDADE: number;
      ZM_VLRTOT: number;
      ZM_SINAL: number;
      ZM_RESTA: number;
      ZM_OBS: string;
      ZM_FENTR: "" | "01" | "02";
    }
  ) {
    const query = `
      UPDATE SZM010 
      SET
	      ZM_DENTR = '${encomenda.ZM_DENTR}',
	      ZM_HENTR = '${encomenda.ZM_HENTR}',
	      ZM_PESO = ${encomenda.ZM_PESO},
	      ZM_FORMATO = '${encomenda.ZM_FORMATO}',
	      ZM_COR  = '${encomenda.ZM_COR}',
	      ZM_LATERAL  = '${encomenda.ZM_LATERAL}',
	      ZM_IDADE  = ${encomenda.ZM_IDADE},
	      ZM_FENTR  = '${encomenda.ZM_FENTR}',
        ZM_VLRTOT = ${encomenda.ZM_VLRTOT},
        ZM_SINAL = ${encomenda.ZM_SINAL},
        ZM_RESTA = ${encomenda.ZM_RESTA},
        ZM_OBS = '${encomenda.ZM_OBS}'
      WHERE 
	      ZM_PEDIDO = '${codigo}'
      `;

    await prisma.$queryRawUnsafe(query);
  }

  async updatePedidosEncomenda(
    codigo: string,
    pedidos: {
      ZM_FILIAL: string;
      ZM_TALAO: string;
      ZN_ITEM: string;
      ZN_PRODUTO: string;
      ZN_DESCRI: string;
      ZN_QUANT: number;
      ZN_VRUNIT: number;
      ZN_VLRITEM: number;
    }[]
  ) {
    let query;
    query = `
    delete from SZN010 
    WHERE ZN_PEDIDO = '${codigo}'
    `;

    await prisma.$queryRawUnsafe(query);

    query = `INSERT INTO SZN010  
  (
    ZN_FILIAL,
    ZN_TALAO,
    ZN_PEDIDO,
    ZN_ITEM,
    ZN_PRODUTO,
    ZN_DESCRI,
    ZN_QUANT,
    ZN_VRUNIT,
    ZN_VLRITEM,
    R_E_C_N_O_
  ) 
  VALUES
  ${pedidos.map((pedido) => {
    return `(
      '${pedido.ZM_FILIAL}',
      '${pedido.ZM_TALAO}',
      '${codigo}',
      '${pedido.ZN_ITEM}',
      '${pedido.ZN_PRODUTO}',
      '${pedido.ZN_DESCRI}',
      ${pedido.ZN_QUANT},
      ${pedido.ZN_VRUNIT},
      ${pedido.ZN_VLRITEM},
      (SELECT TOP 1 s.R_E_C_N_O_
        from SZN010 s
        order by s.R_E_C_N_O_ DESC)+1
    )`;
  })}
  ;`;

    await prisma.$queryRawUnsafe(query);
  }
}
