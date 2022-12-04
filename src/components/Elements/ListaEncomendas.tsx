import { Prohibit } from "phosphor-react";

export default function ListaEncomendas() {
  const lista = [...Array(30)];
  return (
    <div className="listaEncomendas">
      <div className={`content`}>
        {!lista ? (
          lista.map(() => {
            return (
              <div className="encomenda">
                <span>00742</span>
                <div className="encomenda_info">
                  <span className="pedido">Floresta Negra</span>
                  <span className="cliente">Wania</span>
                </div>
                <span>14:00</span>
              </div>
            );
          })
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
