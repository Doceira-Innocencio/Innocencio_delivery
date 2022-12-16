import { prisma } from "../../prisma";
import { Cliente, clienteRepository } from "./cliente-repository";

export class PrismaClienteRepository implements clienteRepository {
  async findMany({ ZR_NOME, ZR_TEL }: { ZR_NOME?: string; ZR_TEL?: string }) {
    let busca;
    let query;
    if (ZR_NOME) {
      query = `SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY ZR_CODIGO) AS Seq FROM [dbo].[SZR010]  WHERE UPPER([dbo].[SZR010].[ZR_NOME]) like UPPER('${ZR_NOME}%') AND 1=1)T WHERE Seq >= 1 AND Seq < 6  ORDER BY Seq`;
    }
    if (ZR_TEL) {
      busca = ``;
      query = `SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY ZR_CODIGO) AS Seq FROM [dbo].[SZR010]  WHERE ([dbo].[SZR010].[ZR_TEL] like '%${ZR_TEL}%' AND 1=1))T WHERE Seq >= 1 AND Seq < 6  ORDER BY Seq`;
    }

    const cliente = (await prisma.$queryRawUnsafe(query)) as Cliente[];

    if (!cliente) {
      return null;
    }

    return cliente;
  }

  async createOne(data: Cliente) {
    const query = `
    INSERT INTO SZR010  
	(
		ZR_FILIAL,
		ZR_CODIGO,
		ZR_LOJA,
		ZR_NOME,
		ZR_END1,
		ZR_BAIRRO1,
		ZR_COMPL1,
		ZR_EST1,
		ZR_CEP1,
		ZR_TEL,
		ZR_DISTANC,
		R_E_C_N_O_
	) 
	VALUES
	(
		'${data.ZR_FILIAL}',
		'${data.ZR_CODIGO}',
		'${data.ZR_LOJA}',
		'${data.ZR_NOME}',
		'${data.ZR_END1}',
		'${data.ZR_BAIRRO1}',
		'${data.ZR_COMPL1}',
		'${data.ZR_EST1}',
		'${data.ZR_CEP1}',
		'${data.ZR_TEL}',
		${data.ZR_DISTANC},
		(SELECT TOP 1 s.R_E_C_N_O_
			from SZR010 s
			order by s.R_E_C_N_O_ DESC)+1
	);
    `;

    await prisma.$queryRawUnsafe(query);
  }

  async update(data: Cliente) {
    const query = `
	UPDATE SZR010  
	SET
		ZR_END1 = '${data.ZR_END1}',
		ZR_CEP1 ='${data.ZR_CEP1}',
		ZR_BAIRRO1 ='${data.ZR_BAIRRO1}',
		ZR_COMPL1 ='${data.ZR_COMPL1}',
		ZR_TEL ='${data.ZR_TEL}'
	WHERE 
		ZR_CODIGO  = '${data.ZR_CODIGO}'
	`;

    await prisma.$queryRawUnsafe(query);
  }
}
