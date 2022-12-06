import { useContext } from "react";
import FichaEncomenda from "../components/Elementos/FichaEncomenda";
import { RegistroEncomendaProvider } from "../contexts/RegistroEncomendaContext";
import { SectionContext } from "../contexts/SectionsContext";

export default function Home() {
  const { sectionProps, setSectionMode } = useContext(SectionContext);
  return (
    <main className={`${sectionProps.mode}`}>
      <div className="mainContainer">
        <RegistroEncomendaProvider>
          <div
            onClick={() => {
              if (sectionProps.mode == "INICIO") {
                return setSectionMode("NOVO");
              } else {
                return;
              }
            }}
            className="fichaViewContainer"
          >
            <FichaEncomenda />
          </div>
        </RegistroEncomendaProvider>
        <div className="actionsBar">
          {sectionProps.mode == "INICIO" && (
            <>
              <button className="criar" onClick={() => setSectionMode("NOVO")}>
                Novo
              </button>
              <button
                className="buscar"
                onClick={() => setSectionMode("BUSCA")}
              >
                Buscar
              </button>
            </>
          )}
          {sectionProps.mode == "BUSCA" && (
            <>
              <button
                className="cancelar"
                onClick={() => setSectionMode("INICIO")}
              >
                Cancelar
              </button>
              <button
                className="buscar"
                onClick={() => setSectionMode("BUSCA")}
              >
                Buscar
              </button>
            </>
          )}
          {sectionProps.mode == "NOVO" && (
            <>
              <button
                className="cancelar"
                onClick={() => setSectionMode("INICIO")}
              >
                Cancelar
              </button>
              <button
                className="buscar"
                onClick={() => setSectionMode("BUSCA")}
              >
                Buscar
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
