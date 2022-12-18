import { useContext, useEffect, useState } from "react";
import { RegistroEncomendaContext } from "../../contexts/RegistroEncomendaContext";
import { api } from "../../util/api";
import DropDownInput from "./form/DropDownInput";

type onChangeDateTypingTimeout = {
  typingTimeout: number | any;
};

interface TelefoneInputAutoCompleteProps {
  value: string;
}

const state: onChangeDateTypingTimeout = {
  typingTimeout: 0,
};
export default function TelefoneInputAutoComplete({
  value,
  onBlur,
}: TelefoneInputAutoCompleteProps) {
  const [telefone, setTelefone] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const { registroEncomendaProps } = useContext(RegistroEncomendaContext);

  useEffect(() => {
    if (!telefone) {
      return;
    }
    clearTimeout(state.typingTimeout);

    state.typingTimeout = setTimeout(async () => {
      await api.get(`/api/cliente/telefone/${telefone}`).then((data) => {
        setOpcoes(
          data.data.data.result.map((cliente) => {
            return {
              codigo: cliente.codigo,
              nome: cliente.nome,
              telefone: cliente.telefone,
              endereco: cliente.endereco.split(",")[0],
              numero: cliente.endereco.split(",")[1],
              cep: cliente.cep,
              bairro: cliente.bairro,
              complemento: cliente.complemento,
            };
          })
        );
      });
    }, 350);
  }, [telefone]);

  useEffect(() => {
    setTelefone(registroEncomendaProps.cliente.telefone);
  }, [registroEncomendaProps.cliente.telefone]);

  return (
    <DropDownInput
      opcoes={opcoes}
      id="telefone"
      onBlur={onBlur}
      onChange={(e) => {
        setTelefone(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          document.getElementById("dEntrega")?.focus();
        }
      }}
      value={telefone}
    />
  );
}
