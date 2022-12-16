import { Prohibit } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { api } from "../../util/api";
import { zeroFill } from "../../util/zeroFill";
import { useQuery } from "react-query";
import { RegistroEncomendaContext } from "../../contexts/RegistroEncomendaContext";

interface ListaEncomendasProps {
  date: string;
  isClickable: boolean;
}

interface encomendas {
  cliente: string;
  telefone: string;
  dEntrega: string;
  hEntrega: string;
  peso: number;
  formato: string;
  cor: string;
  lateral: string;
  idade: number;
  endereco: string;
  cep: string;
  bairro: string;
  complemento: string;
  dPedido: string;
  balconista: string;
  codigo: string;
  entrega: string;
}

export default function ListaEncomendas({ isClickable }: ListaEncomendasProps) {
  const { registroEncomendaProps, fetchNewEncomenda } = useContext(
    RegistroEncomendaContext
  );
  const [lista, setLista] = useState<encomendas[]>([]);

  useEffect(() => {
    api
      .get(
        `/api/encomendas/${registroEncomendaProps.cadastroContext.dateSelected}`
      )
      .then((data) => setLista(data.data.data.encomendas));
  }, [registroEncomendaProps.cadastroContext.dateSelected]);

  return (
    <div className="listaEncomendas">
      <div className={`content`}>
        {lista[0] ? (
          <>
            {isClickable ? (
              <>
                {lista.map((encomenda) => (
                  <div
                    onClick={() => fetchNewEncomenda(encomenda.codigo)}
                    className="encomenda"
                  >
                    <span>{zeroFill(encomenda.codigo, 5)}</span>
                    <div className="encomenda_info">
                      <span className="pedido">{encomenda.telefone}</span>
                      <span className="cliente">{encomenda.cliente}</span>
                    </div>
                    <span>{encomenda.hEntrega}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                {lista.map((encomenda) => (
                  <div className="encomenda">
                    <span>{zeroFill(encomenda.codigo, 5)}</span>
                    <div className="encomenda_info">
                      <span className="pedido">{encomenda.telefone}</span>
                      <span className="cliente">{encomenda.cliente}</span>
                    </div>
                    <span>{encomenda.hEntrega}</span>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <div className="notContent">
            <Prohibit size={32} />
            <h1>Nenhum registro encontrado !</h1>
          </div>
        )}
      </div>
    </div>
  );
}
