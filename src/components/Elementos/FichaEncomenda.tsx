import { useContext, useEffect, useState } from "react";
import { RegistroEncomendaContext } from "../../contexts/RegistroEncomendaContext";
import { SectionContext } from "../../contexts/SectionsContext";
import { api } from "../../util/api";
import { zeroFill } from "../../util/zeroFill";
import Calendario from "./Calendario";
import TelefoneInputAutoComplete from "./TelefoneInputAutoComplete";
import UserInputAutoComplete from "./UserInputAutoComplete";
import { toast } from "react-toastify";

interface FichaEncomendaProps {
  reiniciar: () => void;
}

export default function FichaEncomenda({ reiniciar }: FichaEncomendaProps) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const { sectionProps } = useContext(SectionContext);
  const { setRegistroEncomendaProps, registroEncomendaProps } = useContext(
    RegistroEncomendaContext
  );

  type listaPedidosProps = {
    item: string;
    produto: string;
    descricao: string;
    qtd: number;
    unitario: number;
    total: number;
  }[];

  const [pedidos, setPedidos] = useState([
    {
      item: "",
      produto: "",
      descricao: "",
      qtd: 0,
      unitario: 0,
      total: 0,
    },
    {
      item: "",
      produto: "",
      descricao: "",
      qtd: 0,
      unitario: 0,
      total: 0,
    },
    {
      item: "",
      produto: "",
      descricao: "",
      qtd: 0,
      unitario: 0,
      total: 0,
    },
    {
      item: "",
      produto: "",
      descricao: "",
      qtd: 0,
      unitario: 0,
      total: 0,
    },
    {
      item: "",
      produto: "",
      descricao: "",
      qtd: 0,
      unitario: 0,
      total: 0,
    },
    {
      item: "",
      produto: "",
      descricao: "",
      qtd: 0,
      unitario: 0,
      total: 0,
    },
  ] as listaPedidosProps);

  async function brindProducts(value: string | number, index: number) {
    if (value) {
      const result = await api.get(`/api/produto/${zeroFill(value, 5)}`);
      const { codigo, descricao, unitario } = result.data.data;
      setPedidos(
        pedidos.map((pedidosArray, i) =>
          index == i
            ? {
                ...pedidosArray,
                descricao,
                unitario,
                produto: codigo,
              }
            : {
                ...pedidosArray,
              }
        )
      );
    } else {
      setPedidos(
        pedidos.map((pedidosArray, i) =>
          index == i
            ? {
                ...pedidosArray,
                descricao: "",
                unitario: 0,
                produto: "",
              }
            : {
                ...pedidosArray,
              }
        )
      );
    }
  }

  async function bringBalconista(value: string) {
    if (value) {
      const result = await api.get(`/api/balconistas/${value}`);
      const { codigo, nome, nReduz } = result.data.data.resultado;
      setRegistroEncomendaProps({
        ...registroEncomendaProps,
        registro: {
          ...registroEncomendaProps.registro,
          balconista: nReduz.trim(),
          nBalconista: codigo,
        },
      });
    }
  }

  function addDeliverTax(data) {
    const index = pedidos.findIndex((pedido) => !pedido.produto);

    setPedidos(
      pedidos.map((pedido, i) =>
        index == i
          ? {
              item: i + 1,
              produto: data.codigo,
              descricao: data.descricao,
              qtd: data.quantidade,
              unitario: data.unitario,
              total: parseFloat(data.quantidade) * parseFloat(data.unitario),
            }
          : {
              ...pedido,
            }
      )
    );
  }

  async function bringAddress(value: string) {
    if (value) {
      const { data } = await api.get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBckVf20DMJcgsGUrMVjEhlkb9muWcw6sE&address=${value}`
      );

      const dadosEndereco = {
        cep: data.results[0].address_components[0].long_name,
        endereco: data.results[0].address_components[1].long_name,
        bairro: data.results[0].address_components[2].long_name,
        estado: data.results[0].address_components[3].long_name,
      };

      setRegistroEncomendaProps({
        ...registroEncomendaProps,
        cliente: {
          ...registroEncomendaProps.cliente,
          cep: dadosEndereco.cep,
          endereco: dadosEndereco.endereco,
          bairro: dadosEndereco.bairro,
          estado: dadosEndereco.estado,
        },
      });
    }
  }

  useEffect(() => {
    const fetchData = async () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await api.get(
            `/api/googleMatrix?to=${registroEncomendaProps.cliente.cep}`
          );
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

    if (registroEncomendaProps.encomenda.entrega == "00") {
      if (registroEncomendaProps.cliente.cep) {
        fetchData().then((data) => {
          const distance = data.data.data.rows[0].elements[0].distance;

          setRegistroEncomendaProps({
            ...registroEncomendaProps,
            cliente: {
              ...registroEncomendaProps.cliente,
              distancia: distance.value,
            },
          });

          if (distance.value > 8000) {
            toast.error("mais de 7KM de distância");
            setRegistroEncomendaProps({
              ...registroEncomendaProps,
              encomenda: {
                ...registroEncomendaProps.encomenda,
                entrega: sectionProps.filial,
              },
            });
          }

          if (distance.value > 7100 && distance.value < 8000) {
            addDeliverTax({
              codigo: "198",
              descricao: "TAXA DE ENTREGA",
              quantidade: distance.value / 100,
              unitario: 1,
            });
            toast.error(`Taxa de entrega para ${distance.text} | R$ 20,00`);
          }

          if (distance.value > 6100 && distance.value < 7000) {
            addDeliverTax({
              codigo: "198",
              descricao: "TAXA DE ENTREGA",
              quantidade: distance.value / 100,
              unitario: 1,
            });
            toast.warn(`Taxa de entrega para ${distance.text} | R$ 17,00`);
          }

          if (distance.value > 5100 && distance.value < 6000) {
            addDeliverTax({
              codigo: "198",
              descricao: "TAXA DE ENTREGA",
              quantidade: distance.value / 100,
              unitario: 1,
            });
            toast.warn(`Taxa de entrega para ${distance.text} | R$ 15,00`);
          }

          if (distance.value > 4100 && distance.value < 5000) {
            addDeliverTax({
              codigo: "198",
              descricao: "TAXA DE ENTREGA",
              quantidade: distance.value / 100,
              unitario: 1,
            });
            toast.warn(`Taxa de entrega para ${distance.text} | R$ 12,00`);
          }

          if (distance.value > 2600 && distance.value < 4000) {
            addDeliverTax({
              codigo: "198",
              descricao: "TAXA DE ENTREGA",
              quantidade: distance.value / 100,
              unitario: 1,
            });
            toast.warn(`Taxa de entrega para ${distance.text} | R$ 10,00`);
          }

          if (distance.value > 0 && distance.value < 2500) {
            addDeliverTax({
              codigo: "198",
              descricao: "TAXA DE ENTREGA",
              quantidade: distance.value / 100,
              unitario: 1,
            });
            toast.warn(`Taxa de entrega para ${distance.text} | R$ 10,00`);
          }
        });
      }
    }
  }, [registroEncomendaProps.encomenda.entrega]);

  return (
    <>
      <div id="ficha" className="fichaContainer">
        <div className="fichaHeader">
          <div className="claim">
            <img src="/img/ficha/ficha_logo.jpg" alt="" />
            <h1>Doceira Innocêncio</h1>
          </div>
          <div className="endereco">
            <div>
              <h1>Av.Deputado Emílio Carlos, 2075</h1>
              <h1>Limão</h1>
            </div>
            <div className="contato">
              <h1>Fone:(11) 3936-1783</h1>
              <h1>(11) 9 6687-9396</h1>
            </div>
          </div>
        </div>
        <div className="fichaCliente">
          <div>
            <h1>Nome do Cliente</h1>
            <UserInputAutoComplete
              value={registroEncomendaProps.cliente.nome}
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    nome: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <h1>Telefone</h1>
            <TelefoneInputAutoComplete
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    telefone: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.cliente.telefone}
            />
          </div>
        </div>
        <div className="fichaEncomendaData">
          <div
            onMouseOver={() => {
              setOpenCalendar(true);
            }}
            onMouseLeave={() => {
              setOpenCalendar(false);
            }}
            className="inputData"
          >
            <h1>Dia Mês</h1>
            <input id="dEntrega" type="text" />
            {(sectionProps.mode == "NOVO" || sectionProps.mode == "BUSCA") && (
              <Calendario open={openCalendar} />
            )}
          </div>
          <div>
            <h1>Dia Semana</h1>
            <input disabled type="text" id="dEntregaSem" />
          </div>
          <div>
            <h1>Horario</h1>
            <input
              type="text"
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    hEntrega: e.target.value,
                  },
                });
              }}
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    hEntrega: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.encomenda.hEntrega}
            />
          </div>
        </div>
        <div className="fichaEncomendaBolo">
          <div>
            <h1>Peso</h1>
            <input
              type={"number"}
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    peso: parseInt(e.target.value),
                  },
                });
              }}
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    peso: parseFloat(e.target.value),
                  },
                });
              }}
              value={registroEncomendaProps.encomenda.peso}
            />
          </div>
          <div>
            <h1>Formato</h1>
            <input
              type="text"
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    formato: e.target.value,
                  },
                });
              }}
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    formato: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.encomenda.formato}
            />
          </div>
          <div>
            <h1>Cor</h1>
            <input
              type="text"
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    cor: e.target.value,
                  },
                });
              }}
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    cor: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.encomenda.cor}
            />
          </div>
          <div>
            <h1>Lateral</h1>
            <input
              type="text"
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    lateral: e.target.value,
                  },
                });
              }}
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    lateral: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.encomenda.lateral}
            />
          </div>
          <div>
            <h1>Idade</h1>
            <input
              type={"number"}
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    idade: parseInt(e.target.value),
                  },
                });
              }}
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    idade: parseInt(e.target.value),
                  },
                });
              }}
              value={registroEncomendaProps.encomenda.idade}
            />
          </div>
        </div>
        <div className="fichaEncomendaPedidos">
          <table>
            <tr>
              <th>Codigo</th>
              <th>Descrição</th>
              <th>Qtd</th>
              <th>Unitario</th>
              <th>Valor</th>
            </tr>
            {sectionProps.mode == "BUSCA" && (
              <>
                {[
                  ...Array(
                    registroEncomendaProps.encomenda.pedidos.length
                      ? registroEncomendaProps.encomenda.pedidos.length < 6
                        ? registroEncomendaProps.encomenda.pedidos.length +
                          (6 - registroEncomendaProps.encomenda.pedidos.length)
                        : registroEncomendaProps.encomenda.pedidos.length
                      : 6
                  )
                    .fill({
                      codigo: "",
                      item: "",
                      produto: "",
                      descricao: "",
                      qtd: 0,
                      unitario: 0,
                      vItem: 0,
                    })
                    .map((_, i) =>
                      registroEncomendaProps.encomenda.pedidos[i]
                        ? registroEncomendaProps.encomenda.pedidos[i]
                        : {
                            codigo: "",
                            item: "",
                            produto: "",
                            descricao: "",
                            qtd: 0,
                            unitario: 0,
                            vItem: 0,
                          }
                    ),
                ].map((pedido, i) => {
                  return (
                    <tr>
                      <td>
                        <input id="" type="text" value={pedido.produto} />
                      </td>
                      <td>
                        <input disabled type="text" value={pedido.descricao} />
                      </td>
                      <td>
                        <input type="text" value={pedido.qtd.toFixed(2)} />
                      </td>
                      <td>
                        <input
                          disabled
                          type="text"
                          value={pedido.unitario.toFixed(2)}
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          type="text"
                          value={pedido.vItem.toFixed(2)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
            {sectionProps.mode == "NOVO" || sectionProps.mode == "INICIO" ? (
              <>
                {pedidos.map((pedido, i) => {
                  return (
                    <tr>
                      <td>
                        <input
                          id={`produto_${i}`}
                          type="text"
                          onChange={(e) => {
                            setPedidos(
                              pedidos.map((pedidosArray, index) =>
                                index == i
                                  ? {
                                      ...pedidosArray,
                                      produto: e.target.value,
                                    }
                                  : {
                                      ...pedidosArray,
                                    }
                              )
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.ctrlKey) {
                              return !document
                                .getElementById(`observacao`)
                                ?.focus();
                            }
                            if (e.key == "Enter" || e.key == "Tab") {
                              e.preventDefault();
                              document.getElementById(`qtd_${i}`)?.focus();
                            }
                          }}
                          onBlur={(e) => {
                            brindProducts(e.target.value, i);
                          }}
                          value={pedidos[i]?.produto}
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          type="text"
                          value={pedidos[i]?.descricao}
                        />
                      </td>
                      <td>
                        <input
                          id={`qtd_${i}`}
                          type={"number"}
                          onChange={(e) => {
                            setPedidos(
                              pedidos.map((pedidosArray, index) =>
                                index == i
                                  ? {
                                      ...pedidosArray,
                                      qtd: e.target.value,
                                    }
                                  : {
                                      ...pedidosArray,
                                    }
                              )
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.ctrlKey) {
                              return !document
                                .getElementById(`observacao`)
                                ?.focus();
                            }
                            if (e.key == "Enter" || e.key == "Tab") {
                              e.preventDefault();

                              if (
                                !document.getElementById(`produto_${i + 1}`)
                              ) {
                                setPedidos([
                                  ...pedidos,
                                  {
                                    produto: "",
                                    descricao: "",
                                    item: "",
                                    qtd: 0,
                                    total: 0,
                                    unitario: 0,
                                  },
                                ]);
                                document
                                  .getElementById(`produto_${i + 1}`)
                                  ?.focus();
                              } else {
                                document
                                  .getElementById(`produto_${i + 1}`)
                                  ?.focus();
                              }
                            }
                          }}
                          onBlur={(e) => {
                            setPedidos(
                              pedidos.map((pedidosArray, index) =>
                                index == i
                                  ? {
                                      ...pedidosArray,
                                      total:
                                        pedidos[i].unitario * pedidos[i].qtd,
                                    }
                                  : {
                                      ...pedidosArray,
                                    }
                              )
                            );
                          }}
                          value={pedidos[i]?.qtd}
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          type="text"
                          onChange={(e) => {
                            setPedidos(
                              pedidos.map((pedidosArray, index) =>
                                index == i
                                  ? {
                                      ...pedidosArray,
                                      unitario: e.target.value,
                                    }
                                  : {
                                      ...pedidosArray,
                                    }
                              )
                            );
                          }}
                          value={pedidos[i]?.unitario}
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          type="text"
                          value={
                            parseFloat(pedidos[i]?.unitario) *
                            parseFloat(pedidos[i]?.qtd)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </table>
        </div>
        <div className="fichaValores">
          <div className="blankSpace"></div>
          <div className="valores">
            <table>
              <tr>
                <th>Total</th>
                <td>
                  <input
                    id="total"
                    type="text"
                    value={pedidos
                      .reduce((prev, cur) => prev + cur.total, 0)
                      .toFixed(2)}
                  />
                </td>
              </tr>
              <tr>
                <th>Sinal</th>
                <td>
                  <input id="sinal" type="number" defaultValue={0.0} />
                </td>
              </tr>
              <tr>
                <th>Resta</th>
                <td>
                  <input disabled type="number" value="0.00" />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="fichaObservacao">
          <textarea
            name=""
            id="observacao"
            onChange={(e) => {
              setRegistroEncomendaProps({
                ...registroEncomendaProps,
                encomenda: {
                  ...registroEncomendaProps.encomenda,
                  observacao: e.target.value,
                },
              });
            }}
            onFocus={(e) => {
              setRegistroEncomendaProps({
                ...registroEncomendaProps,
                encomenda: {
                  ...registroEncomendaProps.encomenda,
                  pedidos: pedidos,
                },
              });
            }}
            onBlur={(e) => {
              setRegistroEncomendaProps({
                ...registroEncomendaProps,
                encomenda: {
                  ...registroEncomendaProps.encomenda,
                  observacao: e.target.value,
                },
              });
            }}
            onKeyDown={(e) => {
              if (e.key == "Tab") {
                e.preventDefault();
                document.getElementById("cep")?.focus();
              }
            }}
            value={registroEncomendaProps.encomenda.observacao}
          />
        </div>
        <div className="fichaEndereco_1">
          <div>
            <h1>Endereço</h1>
            <input
              disabled={
                registroEncomendaProps.cadastroContext.clienteAutoComplete
                  ?.endereco
              }
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    endereco: e.target.value,
                  },
                });
              }}
              id="endereco"
              type="text"
              value={registroEncomendaProps.cliente.endereco}
            />
          </div>
          <div>
            <h1>NUMERO</h1>
            <input
              id="numero"
              type="text"
              disabled={
                registroEncomendaProps.cadastroContext.clienteAutoComplete
                  ?.nEndereco
              }
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    nEndereco: e.target.value,
                  },
                });
              }}
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    nEndereco: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.cliente.nEndereco}
            />
          </div>
          <div>
            <h1>CEP</h1>
            <input
              id="cep"
              disabled={
                registroEncomendaProps.cadastroContext.clienteAutoComplete?.cep
              }
              onBlur={(e) => bringAddress(e.target.value)}
              onFocus={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  encomenda: {
                    ...registroEncomendaProps.encomenda,
                    total: pedidos
                      .reduce((prev, cur) => prev + cur.total, 0)
                      .toFixed(2),
                  },
                });
              }}
              type="text"
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    cep: e.target.value,
                  },
                });
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter" || e.key == "Tab") {
                  document.getElementById("complemento")?.focus();
                }
              }}
              value={registroEncomendaProps.cliente.cep}
            />
          </div>
        </div>
        <div className="fichaEndereco_2">
          <div>
            <h1>Bairro</h1>
            <input
              id="bairro"
              disabled
              type="text"
              value={registroEncomendaProps.cliente.bairro}
            />
          </div>
          <div>
            <h1>Complemento</h1>
            <input
              id="complemento"
              onKeyDown={(e) => {
                if (e.key == "tab") {
                  document.getElementById("balconista")?.focus();
                }
              }}
              onBlur={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  cliente: {
                    ...registroEncomendaProps.cliente,
                    complemento: e.target.value,
                  },
                });
              }}
              type="text"
              value={registroEncomendaProps.cliente.complemento}
            />
          </div>
        </div>
        <div className="fichaDados">
          <div>
            <h1>Encomendado Em:</h1>
            <input
              disabled
              type="text"
              value={Intl.DateTimeFormat("pt-br", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date())}
            />
          </div>
          <div>
            <h1>Balconista</h1>
            <input
              id="balconista"
              type="text"
              onBlur={(e) => {
                bringBalconista(e.target.value);
              }}
              onChange={(e) => {
                setRegistroEncomendaProps({
                  ...registroEncomendaProps,
                  registro: {
                    ...registroEncomendaProps.registro,
                    balconista: e.target.value,
                  },
                });
              }}
              value={registroEncomendaProps.registro.balconista}
            />
          </div>
          <div>
            <h1>Pedido</h1>
            <input
              disabled
              type="text"
              value={registroEncomendaProps.cadastroContext.codigoEncomenda}
            />
          </div>
        </div>
        <div className="entregaContainer">
          <div className="entrega">
            <input
              id="entrega"
              name="entrega"
              onChange={(e) => {
                if (e.target.checked) {
                  setRegistroEncomendaProps({
                    ...registroEncomendaProps,
                    encomenda: {
                      ...registroEncomendaProps.encomenda,
                      entrega: "00",
                    },
                  });
                } else {
                  setRegistroEncomendaProps({
                    ...registroEncomendaProps,
                    encomenda: {
                      ...registroEncomendaProps.encomenda,
                      entrega: sectionProps.filial,
                    },
                  });
                }
              }}
              value={!registroEncomendaProps.encomenda.entrega}
              type={"checkbox"}
            />
            <label htmlFor="entrega">Entrega ?</label>
          </div>
        </div>
      </div>
    </>
  );
}
