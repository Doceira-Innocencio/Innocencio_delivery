import { useEffect, useState } from "react";
import { api } from "../../util/api";
import DropDownInput from "./form/DropDownInput";

type onChangeDateTypingTimeout = {
  typingTimeout: number | any;
};

interface UserInputAutoComplete {
  value: string;
  onBlur: () => void;
}

export default function UserInputAutoComplete({
  value,
  onBlur,
}: UserInputAutoComplete) {
  const [nome, setNome] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  const state: onChangeDateTypingTimeout = {
    typingTimeout: 0,
  };

  useEffect(() => {
    if (!nome) {
      return;
    }
    clearTimeout(state.typingTimeout);

    state.typingTimeout = setTimeout(async () => {
      await api.get(`/api/cliente/nome/${nome}`).then((data) => {
        setOpcoes(
          data.data.data.result.map((cliente) => {
            return {
              codigo: cliente.codigo,
              nome: cliente.nome,
              telefone: cliente.telefone,
              endereco: cliente.endereco.split(",")[0],
              numero: cliente.endereco.split(",")[1]
                ? cliente.endereco.split(",")[1]
                : "",
              cep: cliente.cep,
              bairro: cliente.bairro,
              complemento: cliente.complemento,
            };
          })
        );
      });
    }, 500);
  }, [nome]);

  return (
    <DropDownInput
      opcoes={opcoes}
      id="nome"
      onBlur={onBlur}
      onChange={(e) => {
        setNome(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          document.getElementById("telefone")?.focus();
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          console.log("sim");
          document.getElementById("nome_0")?.focus();
        }
      }}
      value={nome}
    />
  );
}
