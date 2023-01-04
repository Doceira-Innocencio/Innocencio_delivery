import { useContext, useEffect, useState } from "react";
import FichaEncomenda from "../components/Elementos/FichaEncomenda";
import { RegistroEncomendaContext } from "../contexts/RegistroEncomendaContext";
import { SectionContext } from "../contexts/SectionsContext";
import ListaEncomendas from "../components/Elementos/ListaEncomenda";
import { api } from "../util/api";
import { toast } from "react-toastify";
import { setCookie, destroyCookie } from "nookies";
import Cookies from "js-cookie";
import printFicha from "../util/pdf2print";

export default function Home() {
  const { sectionProps, setSectionMode } = useContext(SectionContext);
  const { setRegistroEncomendaProps, registroEncomendaProps, resetForm } =
    useContext(RegistroEncomendaContext);
  const [renderForm, setRenderForm] = useState(true);

  function restartForm() {
    setRenderForm(false);
    setTimeout(() => {
      setRenderForm(true);
    }, 1);
  }

  async function handleCancelEncomenda() {
    setSectionMode("INICIO");
    if (
      sectionProps.mode == "NOVO" &&
      registroEncomendaProps.cadastroContext.codigoEncomenda
    ) {
      await api.put(
        `/api/encomendas/codigo/${sectionProps.filial}/release/${registroEncomendaProps.cadastroContext.codigoEncomenda}`
      );

      sessionStorage
        .getItem("ENCOMENDA.CODIGOS")
        ?.replace(
          registroEncomendaProps.cadastroContext.codigoEncomenda + ",",
          ""
        );

      setRegistroEncomendaProps({
        ...registroEncomendaProps,
        cadastroContext: {
          ...registroEncomendaProps.cadastroContext,
          codigoEncomenda: "",
          dateSelected: "",
        },
      });
    } else {
      setRegistroEncomendaProps({
        ...registroEncomendaProps,
        cadastroContext: {
          ...registroEncomendaProps.cadastroContext,
          codigoEncomenda: "",
        },
      });
    }

    resetForm();
    restartForm();

    window.onbeforeunload = function (e) {};
  }

  function handleChangeFilial() {}

  async function handleSubmitEncomenda() {
    try {
      toast.loading("Registrando Encomenda !");

      if (registroEncomendaProps.cadastroContext.idClienteAutoComplete) {
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
          codCliente:
            registroEncomendaProps.cadastroContext.idClienteAutoComplete,
        });
      } else {
        await api.post("/api/encomendas/encomenda/", {
          filial: sectionProps.filial,
          loja: sectionProps.filial,
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
            codigo: registroEncomendaProps.cadastroContext.codigoEncomenda,
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
      }

      toast.dismiss();
      toast.success("Encomenda Criada Com Sucesso ! ");
      api.put(
        `/api/encomendas/codigo/${sectionProps.filial}/finish/${registroEncomendaProps.cadastroContext.codigoEncomenda}`
      );

      printFicha();
      resetForm();
      restartForm();
      setSectionMode("NOVO");
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
        ...registroEncomendaProps.cadastroContext,
        codigoEncomenda: response.data.codigo,
      },
    });

    const listSession = sessionStorage.getItem("ENCOMENDA.CODIGOS")?.split(",");
    const listCookies = Cookies.get("ENCOMENDA.CODIGOS")?.split(",");

    if (!listCookies?.includes(response.data.codigo)) {
      if (listSession) {
        setCookie(
          undefined,
          "ENCOMENDA.CODIGOS",
          Cookies.get("ENCOMENDA.CODIGOS") + response.data.codigo + ",",
          {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          }
        );
      } else {
        setCookie(undefined, "ENCOMENDA.CODIGOS", response.data.codigo + ",", {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
      }
    }

    if (!listSession?.includes(response.data.codigo)) {
      if (listSession) {
        sessionStorage.setItem(
          "ENCOMENDA.CODIGOS",
          sessionStorage.getItem("ENCOMENDA.CODIGOS") +
            response.data.codigo +
            ","
        );
      } else {
        sessionStorage.setItem("ENCOMENDA.CODIGOS", response.data.codigo + ",");
      }
    }

    window.onbeforeunload = function (e) {
      return "Por favor Cancele A Encomenda Antes de Fechar a Janela";
    };
  }

  useEffect(() => {
    const codigos = Cookies.get("ENCOMENDA.CODIGOS")?.split(",");
    const listSession = sessionStorage.getItem("ENCOMENDA.CODIGOS")?.split(",");
    const releaseCodigos = codigos?.map((codigo) => {
      if (!listSession?.includes(codigo)) {
        const newCookie = Cookies.get("ENCOMENDA.CODIGOS").replace(
          `${codigo},`,
          ""
        );
        setCookie(undefined, "ENCOMENDA.CODIGOS", newCookie);
        const fetchData = async () =>
          new Promise(async (resolve, reject) => {
            try {
              await api.put(
                `/api/encomendas/codigo/${sectionProps.filial}/release/${codigo}`
              );
              resolve("ok");
            } catch (err) {
              reject(err);
            }
          });
        fetchData()
          .then((data) => data)
          .catch((err) => err);
      }
    });
  }, []);

  return (
    <>
      <main className={`container ${sectionProps.mode}`}>
        <div className="filialSection">
          <span>
            Filial: $
            {sectionProps.filial === "01" ? "Emilio Carlos" : "Andorinha"}
          </span>
          <button onClick={handleChangeFilial}>Sair</button>
        </div>
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
            {renderForm && <FichaEncomenda />}
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
                {registroEncomendaProps.cadastroContext.codigoEncomenda && (
                  <button
                    className="Imprimir"
                    onClick={() => {
                      printFicha();
                    }}
                  >
                    Imprimir
                  </button>
                )}
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
                    <>
                      <button
                        className="finalizar"
                        onClick={handleSubmitEncomenda}
                      >
                        Finalizar
                      </button>
                    </>
                  )}
                <button className="cancelar" onClick={handleCancelEncomenda}>
                  Cancelar
                </button>
                <button
                  className="Imprimir"
                  onClick={() => {
                    printFicha();
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
