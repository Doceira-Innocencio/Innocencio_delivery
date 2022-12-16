import { useContext } from "react";
import FichaEncomenda from "../components/Elementos/FichaEncomenda";
import {
  RegistroEncomendaContext,
  RegistroEncomendaProvider,
} from "../contexts/RegistroEncomendaContext";
import { SectionContext } from "../contexts/SectionsContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ListaEncomendas from "../components/Elementos/ListaEncomenda";
import { api } from "../util/api";
import { toast } from "react-toastify";

export default function Home() {
  const { sectionProps, setSectionMode } = useContext(SectionContext);
  const { setRegistroEncomendaProps, registroEncomendaProps, resetForm } =
    useContext(RegistroEncomendaContext);
  const doc = new jsPDF();

  async function handleCancelEncomenda() {
    setSectionMode("INICIO");
    if (
      sectionProps.mode == "NOVO" &&
      registroEncomendaProps.cadastroContext.codigoEncomenda
    ) {
      await api.put(
        `/api/encomendas/codigo/${sectionProps.filial}/release/${registroEncomendaProps.cadastroContext.codigoEncomenda}`
      );

      setRegistroEncomendaProps({
        ...registroEncomendaProps,
        cadastroContext: {
          codigoEncomenda: "",
          dateSelected: "",
        },
      });
    } else {
      setRegistroEncomendaProps({
        ...registroEncomendaProps,
        cadastroContext: {
          codigoEncomenda: "",
        },
      });
    }

    resetForm();
  }

  async function handleSubmitEncomenda() {
    try {
      toast.loading("Registrando Encomenda !");

      await api.post("/api/encomendas/encomenda/", {
        filial: sectionProps.filial,
        loja: sectionProps.filial,
        talao: "010",
        codigo: registroEncomendaProps.cadastroContext.codigoEncomenda,
        dEntrega: registroEncomendaProps.encomenda.dEntrega
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join(""),
        hEntrega: registroEncomendaProps.encomenda.hEntrega,
        peso: registroEncomendaProps.encomenda.peso,
        formato: registroEncomendaProps.encomenda.formato,
        cor: registroEncomendaProps.encomenda.cor,
        lateral: registroEncomendaProps.encomenda.lateral,
        idade: registroEncomendaProps.encomenda.idade,
        pedidos: registroEncomendaProps.encomenda.pedidos
          .filter((pedido, index) => {
            if (pedido.produto) {
              return pedido;
            } else {
              return;
            }
          })
          .map((pedido, index) => {
            return {
              item: `0${index + 1}`,
              produto: pedido.produto.trim(),
              descricao: pedido.descricao.trim(),
              qtd: parseFloat(pedido.qtd),
              unitario: parseFloat(pedido.unitario),
              total: parseFloat(pedido.unitario) * parseFloat(pedido.qtd),
            };
          }),
        observacao: registroEncomendaProps.encomenda.observacao,
        total: registroEncomendaProps.encomenda.total,
        sinal: registroEncomendaProps.encomenda.sinal,
        resta: registroEncomendaProps.encomenda.resta,
        balconista: registroEncomendaProps.registro.nBalconista,
        entrega: registroEncomendaProps.encomenda.entrega
          ? registroEncomendaProps.encomenda.entrega
          : sectionProps.filial,
        cliente: {
          codigo: "610001",
          nome: registroEncomendaProps.cliente.nome,
          endereco: registroEncomendaProps.cliente.endereco,
          bairro: registroEncomendaProps.cliente.bairro,
          complemento: registroEncomendaProps.cliente.complemento,
          estado: "SP",
          cep: registroEncomendaProps.cliente.cep.replace("-", ""),
          telefone: registroEncomendaProps.cliente.telefone,
          distancia: registroEncomendaProps.cliente.distancia
            ? registroEncomendaProps.cliente.distancia
            : 0,
        },
      });

      toast.dismiss();
      toast.success("Encomenda Criada Com Sucesso ! ");
      api.put(
        `/api/encomendas/codigo/${sectionProps.filial}/finish/${registroEncomendaProps.cadastroContext.codigoEncomenda}`
      );
      resetForm();
    } catch (err) {
      console.log(err);
      toast.dismiss();
    }
  }

  async function handleNewEncomenda() {
    setSectionMode("NOVO");

    document.getElementById("nome")?.focus();

    const response = await api.put(
      `/api/encomendas/codigo/${sectionProps.filial}/getCodigo`
    );

    setRegistroEncomendaProps({
      ...registroEncomendaProps,
      cadastroContext: {
        codigoEncomenda: response.data.codigo,
      },
    });
  }

  return (
    <>
      <main className={`${sectionProps.mode}`}>
        <div className="mainContainer">
          <div
            onClick={() => {
              if (sectionProps.mode == "INICIO") {
                return handleNewEncomenda();
              } else {
                return;
              }
            }}
            className="fichaViewContainer"
          >
            <FichaEncomenda />

            {registroEncomendaProps.cadastroContext.dateSelected &&
              (sectionProps.mode == "BUSCA" || sectionProps.mode == "NOVO") && (
                <ListaEncomendas
                  date="20220601"
                  isClickable={sectionProps.mode == "BUSCA"}
                />
              )}
          </div>
          <div className="actionsBar">
            {sectionProps.mode == "INICIO" && (
              <>
                <button className="criar" onClick={handleNewEncomenda}>
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
                <button className="cancelar" onClick={handleCancelEncomenda}>
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
                {registroEncomendaProps.cliente.nome &&
                  registroEncomendaProps.cliente.telefone &&
                  registroEncomendaProps.encomenda.dEntrega &&
                  registroEncomendaProps.encomenda.hEntrega &&
                  registroEncomendaProps.encomenda.total > 0 &&
                  registroEncomendaProps.cliente.endereco &&
                  registroEncomendaProps.cliente.cep &&
                  registroEncomendaProps.cliente.nEndereco &&
                  registroEncomendaProps.cliente.bairro &&
                  registroEncomendaProps.registro.balconista && (
                    <button
                      className="ButtonSubmit"
                      onClick={handleSubmitEncomenda}
                    >
                      Finalizar
                    </button>
                  )}
                <button className="cancelar" onClick={handleCancelEncomenda}>
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
    </>
  );
}
