import { useContext } from "react";
import FichaEncomenda from "../components/Elementos/FichaEncomenda";
import { RegistroEncomendaProvider } from "../contexts/RegistroEncomendaContext";
import { SectionContext } from "../contexts/SectionsContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const { sectionProps, setSectionMode } = useContext(SectionContext);
  const doc = new jsPDF();

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
                className="Imprimir"
                onClick={function () {
                  const ficha = document.getElementById("ficha");
                  // ficha?.style.fontFeatureSettings = '"Arial" 0';
                  html2canvas(ficha, {
                    width: 1920,
                    height: 1080,
                    windowWidth: 10,
                    windowHeight: 10,
                  }).then(async (canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    doc.addImage(imgData, "png", 20, 20);
                    await doc.save("encomenda");
                  });
                }}
              >
                Imprimir
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
