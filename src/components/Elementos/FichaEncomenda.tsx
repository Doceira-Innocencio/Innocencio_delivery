import { useContext, useState } from "react";
import { RegistroEncomendaContext } from "../../contexts/RegistroEncomendaContext";
import { SectionContext } from "../../contexts/SectionsContext";
import Calendario from "./Calendario";
import DropDownInput from "./form/DropDownInput";

export default function FichaEncomenda() {
  const { registroEncomendaProps, setRegistroEncomendaProps } = useContext(
    RegistroEncomendaContext
  );

  const { sectionProps, setSectionMode } = useContext(SectionContext);
  const [onCalendarShow, setOnCalendarShow] = useState(false);

  function handleToggleCalendarShow() {
    setOnCalendarShow(!onCalendarShow);
  }

  const fichaInfo = { ...registroEncomendaProps };

  return (
    <table
      id="ficha"
      className="ficha"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      width={543}
      style={{
        borderCollapse: "collapse",
        tableLayout: "fixed",
        width: "408pt",
      }}
    >
      <colgroup>
        <col width={64} style={{ width: "48pt" }} />
        <col
          width={71}
          style={{
            width: "53pt",
          }}
        />
        <col
          width={161}
          style={{
            width: "121pt",
          }}
        />
        <col
          width={68}
          style={{
            width: "51pt",
          }}
        />
        <col
          width={101}
          style={{
            width: "76pt",
          }}
        />
        <col
          width={78}
          style={{
            width: "59pt",
          }}
        />
      </colgroup>
      <tbody>
        <tr height={57} style={{ height: "42.75pt" }}>
          <td
            colSpan={6}
            height={57}
            width={543}
            style={{
              borderRight: "1.0pt solid black",
              height: "42.75pt",
              width: "408pt",
            }}
            align="left"
            valign="top"
          >
            <span
              style={{
                position: "absolute",
                zIndex: 7,
                marginLeft: "0px",
                marginTop: "0px",
                width: "100px",
                height: "56px",
              }}
            >
              <img width={100} height={56} src="/img/ficha/ficha_logo.png" />
            </span>
            <span style={{}}>
              <table cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td
                      colSpan={6}
                      height={57}
                      className="xl937123"
                      width={543}
                      style={{
                        borderRight: "1.0pt solid black",
                        height: "42.75pt",
                        width: "408pt",
                      }}
                    >
                      Doceira Innocencio
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
          </td>
        </tr>
        <tr height={57} style={{ height: "42.75pt" }}>
          <td
            colSpan={4}
            height={57}
            className="xl967123"
            width={364}
            style={{ height: "42.75pt", width: "273pt" }}
          >
            <span
              style={{
                position: "absolute",
                zIndex: 1,
                marginLeft: "-24px",
                marginTop: "0px",
                width: "33px",
                height: "32px",
              }}
            ></span>
            Av. Deputado Emilio Carlos, 2075
            <br />
            Limão
          </td>
          <td
            colSpan={2}
            height={57}
            width={179}
            style={{
              borderRight: "1.0pt solid black",
              height: "42.75pt",
              width: "135pt",
            }}
            align="left"
            valign="top"
          >
            <span
              style={{
                position: "absolute",
                zIndex: 3,
                marginLeft: "41px",
                marginTop: "31px",
                width: "16px",
                height: "16px",
              }}
            >
              <img width={16} height={16} src="/img/ficha/ficha_whatsapp.png" />
            </span>
            <span style={{}}>
              <table cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      height={57}
                      className="xl987123"
                      width={179}
                      style={{
                        borderRight: "1.0pt solid black",
                        height: "42.75pt",
                        width: "135pt",
                      }}
                    >
                      Fone: (11) 3936-1783
                      <br />
                      <span style={{}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      </span>
                      (11) 96687-9396
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={3}
            height={20}
            className="xl1007123"
            style={{ height: "15.0pt" }}
          >
            Nome do Cliente
          </td>
          <td
            colSpan={3}
            className="xl1027123"
            style={{ borderRight: "1.0pt solid black" }}
          >
            Telefone
          </td>
        </tr>
        <tr height={19} style={{ height: "14.45pt" }}>
          <td
            colSpan={3}
            height={19}
            className="xl1057123"
            style={{ height: "14.45pt" }}
          >
            {sectionProps.mode == "NOVO" && (
              <DropDownInput
                id="Novo_NOME"
                opcoes={[
                  "CELSO LORENSATTO DA SILVA FILHO",
                  "CELSO LORENSATTO DA SILVA",
                ]}
                placeholder=" "
              />
            )}
            {sectionProps.mode == "BUSCA" && (
              <DropDownInput
                id="Busca_NOME"
                opcoes={[
                  "CELSO LORENSATTO DA SILVA FILHO",
                  "CELSO LORENSATTO DA SILVA",
                ]}
                placeholder=" "
              />
            )}
          </td>
          <td
            colSpan={3}
            className="xl1077123"
            style={{ borderRight: "1.0pt solid black" }}
          >
            {sectionProps.mode == "NOVO" && (
              <DropDownInput
                id="Novo_TELEFONE"
                opcoes={["Celso (11) 9 5499-2796", "Marcos (11) 9 5499-2794"]}
                placeholder=" "
              />
            )}
            {sectionProps.mode == "BUSCA" && (
              <DropDownInput
                id="Busca_TELEFONE"
                opcoes={["Celso (11) 9 5499-2796", "Marcos (11) 9 5499-2794"]}
                placeholder=" "
              />
            )}
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={2}
            height={20}
            className="xl1107123"
            style={{ borderRight: ".5pt solid black", height: "15.0pt" }}
          >
            Dia Mês
          </td>
          <td
            className="xl927123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            Dia Semana
          </td>
          <td
            colSpan={3}
            className="xl927123"
            style={{ borderRight: "1.0pt solid black" }}
          >
            Horario
          </td>
        </tr>
        <tr height={42} style={{ height: "31.5pt" }}>
          <td
            colSpan={2}
            height={42}
            onClick={handleToggleCalendarShow}
            className="xl1147123 dateCell"
            style={{ borderRight: ".5pt solid black", height: "31.5pt" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input
                onFocus={() => setOnCalendarShow(true)}
                id="NOVO_DATA"
                placeholder=" "
                type="text"
              />
            )}

            {sectionProps.mode == "BUSCA" && (
              <input
                onFocus={() => setOnCalendarShow(true)}
                id="NOVO_BUSCA"
                placeholder=" "
                type="text"
              />
            )}
            {onCalendarShow && <Calendario />}
          </td>
          <td className="xl907123" style={{ borderLeft: "none" }}>
            {/* {fichaInfo.encomenda.entrega.toLocaleString("pt-br", {
              weekday: "long",
            })} */}
          </td>
          <td
            colSpan={3}
            className="xl1167123"
            style={{ borderRight: "1.0pt solid black" }}
          >
            {/* {fichaInfo.encomenda.entrega.toLocaleString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
            })} */}
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={2}
            height={20}
            className="xl1107123"
            style={{ borderRight: ".5pt solid black", height: "15.0pt" }}
          >
            Peso
          </td>
          <td
            className="xl927123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            Formato
          </td>
          <td className="xl687123" style={{ borderTop: "none" }}>
            Cor
          </td>
          <td
            className="xl687123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            Lateral
          </td>
          <td
            className="xl727123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            Idade
          </td>
        </tr>
        <tr height={45} style={{ height: "33.75pt" }}>
          <td
            colSpan={2}
            height={50}
            className="xl1197123"
            style={{ borderRight: ".5pt solid black" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_PESO" placeholder=" " type="text" />
            )}
          </td>
          <td className="xl917123" height={50} style={{ borderLeft: "none" }}>
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_FORMATO" placeholder=" " type="text" />
            )}
          </td>
          <td
            className="xl667123"
            height={50}
            style={{ borderTop: "none", width: "51pt" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_COR" placeholder=" " type="text" />
            )}
          </td>
          <td
            className="xl657123"
            align="right"
            height={50}
            style={{ borderTop: "none", borderLeft: "none", width: "76pt" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_LATERAL" placeholder=" " type="text" />
            )}
          </td>
          <td className="xl737123" height={50} align="right">
            {sectionProps.mode == "NOVO" && (
              <input id="Novo_IDADE" placeholder=" " type="text" />
            )}
          </td>
        </tr>
        <tr height={21} style={{ height: "15.75pt" }}>
          <td height={21} className="xl867123" style={{ height: "15.75pt" }}>
            Codigo
          </td>
          <td colSpan={2} className="xl1217123" style={{ borderLeft: "none" }}>
            Descrição
          </td>
          <td className="xl877123" style={{ borderLeft: "none" }}>
            Qtd
          </td>
          <td className="xl887123" style={{ borderLeft: "none" }}>
            Unitario
          </td>
          <td className="xl897123">Valor</td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            {sectionProps.mode == "NOVO" && (
              <input id="Novo_PEDIDO_CODIGO" placeholder=" " type="text" />
            )}
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td
            colSpan={2}
            className="xl1227123"
            style={{ borderLeft: "none", overflow: "hidden" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input disabled id="Novo_PEDIDO_DESCRICAO" type="text" />
            )}
          </td>
          <td className="xl637123" style={{ borderLeft: "none" }}>
            {sectionProps.mode == "NOVO" && (
              <input id="Novo_PEDIDO_QUANTIDADE" placeholder=" " type="text" />
            )}
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            {sectionProps.mode == "NOVO" && (
              <input disabled id="Novo_PEDIDO_UNITARIO" type="text" />
            )}
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            {(fichaInfo.pedido.unitario * fichaInfo.pedido.qtd).toFixed(2)}
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td
            colSpan={2}
            className="xl1227123"
            style={{ borderLeft: "none" }}
          ></td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          ></td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td height={20} className="xl747123" style={{ height: "15.0pt" }}>
            &nbsp;
          </td>
          <td colSpan={2} className="xl1227123" style={{ borderLeft: "none" }}>
            &nbsp;
          </td>
          <td
            className="xl647123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            0
          </td>
          <td className="xl697123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
          <td className="xl757123" style={{ borderLeft: "none" }}>
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            -<span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={21} style={{ height: "15.75pt" }}>
          <td
            height={21}
            className="xl767123"
            style={{ height: "15.75pt", borderTop: "none" }}
          >
            Nota:
          </td>
          <td
            colSpan={5}
            className="xl1237123"
            style={{ borderRight: "1.0pt solid black", borderLeft: "none" }}
          >
            &nbsp;
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={6}
            rowSpan={4}
            height={81}
            className="xl1267123"
            width={543}
            style={{
              borderRight: "1.0pt solid black",
              borderBottom: "1.0pt solid black",
              height: "60.75pt",
              width: "408pt",
            }}
          >
            {sectionProps.mode == "NOVO" && (
              <textarea
                id="Novo_PEDIDO_OBSERVACAO"
                placeholder=" "
                type="text"
              />
            )}
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}></tr>
        <tr height={20} style={{ height: "15.0pt" }}></tr>
        <tr height={21} style={{ height: "15.75pt" }}></tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={4}
            rowSpan={3}
            height={61}
            className="xl1347123"
            style={{
              borderRight: "1.0pt solid black",
              borderBottom: ".5pt solid black",
              height: "45.75pt",
            }}
          ></td>
          <td
            className="xl817123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            Total
          </td>
          <td
            className="xl827123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            {(
              fichaInfo.pedido.unitario * fichaInfo.pedido.qtd +
              fichaInfo.entrega?.unitario * fichaInfo.entrega?.qtd
            ).toFixed(2)}
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            height={20}
            className="xl837123"
            style={{ height: "15.0pt", borderTop: "none", borderLeft: "none" }}
          >
            Sinal
          </td>
          <td
            className="xl777123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            {fichaInfo.cliente.sinal.toFixed(2)}
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={21} style={{ height: "15.75pt" }}>
          <td
            height={21}
            className="xl847123"
            style={{ height: "15.75pt", borderTop: "none", borderLeft: "none" }}
          >
            Resta
          </td>
          <td
            className="xl857123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            <span style={{}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </span>
            {(
              fichaInfo.pedido.unitario * fichaInfo.pedido.qtd +
              fichaInfo.entrega?.unitario * fichaInfo.entrega?.qtd -
              fichaInfo.cliente.sinal
            ).toFixed(2)}
            <span style={{}}>&nbsp;&nbsp; </span>
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={4}
            height={20}
            className="xl1417123"
            style={{ borderRight: ".5pt solid black", height: "15.0pt" }}
          >
            Endereço
          </td>
          <td className="xl797123">Numero</td>
          <td className="xl807123" style={{ borderLeft: "none" }}>
            CEP
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={4}
            height={20}
            className="xl1057123"
            style={{ borderRight: ".5pt solid black", height: "15.0pt" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_ENDERECO" placeholder=" " type="text" />
            )}

            {sectionProps.mode == "BUSCA" && (
              <input id="BUSCA_ENDERECO" placeholder=" " type="text" />
            )}
          </td>
          <td className="xl677123">
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_nENDERECO" placeholder=" " type="text" />
            )}
          </td>
          <td className="xl737123" align="right">
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_DATA" placeholder=" " type="text" />
            )}

            {sectionProps.mode == "BUSCA" && (
              <input id="BUSCA_DATA" placeholder=" " type="text" />
            )}
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={4}
            height={20}
            className="xl1417123"
            style={{ borderRight: ".5pt solid black", height: "15.0pt" }}
          >
            Bairro
          </td>
          <td
            colSpan={2}
            className="xl1447123"
            style={{ borderRight: "1.0pt solid black", borderLeft: "none" }}
          >
            Complemento
          </td>
        </tr>
        <tr height={20} style={{ height: "15.0pt" }}>
          <td
            colSpan={3}
            height={20}
            className="xl1517123"
            style={{ height: "15.0pt" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_BAIRRO" placeholder=" " type="text" />
            )}
          </td>
          <td className="xl707123" style={{ borderTop: "none" }}>
            &nbsp;
          </td>
          <td
            colSpan={2}
            className="xl1537123"
            style={{ borderRight: "1.0pt solid black", borderLeft: "none" }}
          >
            {sectionProps.mode == "NOVO" && (
              <input id="NOVO_COMPLEMENTO" placeholder=" " type="text" />
            )}
          </td>
        </tr>
        <tr height={21} style={{ height: "15.75pt" }}>
          <td
            colSpan={2}
            height={21}
            className="xl1557123"
            style={{ borderRight: ".5pt solid black", height: "15.75pt" }}
          >
            Encomendado em:
          </td>
          <td
            colSpan={3}
            className="xl1577123"
            style={{ borderRight: ".5pt solid black", borderLeft: "none" }}
          >
            Balconista
          </td>
          <td
            className="xl787123"
            style={{ borderTop: "none", borderLeft: "none" }}
          >
            Pedido
          </td>
        </tr>
        <tr height={26} style={{ height: "19.5pt" }}>
          <td
            colSpan={2}
            height={26}
            className="xl1467123"
            style={{ borderRight: ".5pt solid black", height: "19.5pt" }}
          >
            {new Date().toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </td>
          <td
            colSpan={3}
            className="xl1487123"
            style={{ borderRight: ".5pt solid black", borderLeft: "none" }}
          >
            {sectionProps.mode == "NOVO" && (
              <DropDownInput
                id="Novo_NOME"
                opcoes={[
                  "CELSO LORENSATTO DA SILVA FILHO",
                  "CELSO LORENSATTO DA SILVA",
                ]}
                placeholder=" "
              />
            )}
          </td>
          <td className="xl717123" style={{ borderLeft: "none" }}>
            {sectionProps.mode == "BUSCA" && (
              <input type="numeric" id="Busca_NOME" placeholder=" " />
            )}
          </td>
        </tr>
        <tr height={0} style={{ display: "none" }}>
          <td width={64} style={{ width: "48pt" }} />
          <td width={71} style={{ width: "53pt" }} />
          <td width={161} style={{ width: "121pt" }} />
          <td width={68} style={{ width: "51pt" }} />
          <td width={101} style={{ width: "76pt" }} />
          <td width={78} style={{ width: "59pt" }} />
        </tr>
      </tbody>
    </table>
  );
}
