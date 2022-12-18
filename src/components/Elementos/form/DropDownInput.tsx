import { useContext, useState } from "react";
import { RegistroEncomendaContext } from "../../../contexts/RegistroEncomendaContext";

interface DropDownInput {
  id?: string;
  opcoes: string[];
  placeholder: string;
  value: string;
  onKeyDown: () => void;
  onChange: () => void;
  onBlur: () => void;
}

export default function DropDownInput({
  id,
  opcoes,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
}: DropDownInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [onCloseTimeout, setOnCloseTimeout] = useState(false);

  const { setRegistroEncomendaProps, registroEncomendaProps } = useContext(
    RegistroEncomendaContext
  );

  return (
    <div className="dropDownContainer">
      <input
        id={id}
        placeholder=" "
        type="text"
        onBlur={(e) => {
          onBlur(e);
        }}
        className="dropDownHeader"
        onChange={(e) => {
          if (isOpen) {
          } else {
            setIsOpen(true);
          }
          onChange(e);
        }}
        onKeyDown={onKeyDown}
        value={value}
        autoComplete="off"
      />
      {isOpen && (
        <div className="dropDownListContainer">
          <ul className="dropDownList">
            {opcoes.map((opcao, i) => (
              <button
                className={`listItem item_${i}`}
                id={`nome_${i}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(opcao);
                  setRegistroEncomendaProps({
                    ...registroEncomendaProps,
                    cadastroContext: {
                      ...registroEncomendaProps.cadastroContext,
                      idClienteAutoComplete: opcao.codigo,
                    },
                    cliente: {
                      ...registroEncomendaProps.cliente,
                      nome: opcao.nome,
                      telefone: opcao.telefone,
                      endereco: opcao.endereco,
                      nEndereco: opcao.endereco.split(",")[1],
                      cep: opcao.cep,
                      bairro: opcao.bairro,
                      complemento: opcao.complemento,
                      distancia: opcao.distancia,
                      estado: opcao.estado,
                    },
                  });
                  setIsOpen(false);
                  document.getElementById("dEntrega")?.focus();
                }}
                onMouseOver={() => {
                  document.getElementById("telefone")!.placeholder =
                    opcao.telefone;

                  document.getElementById("endereco")!.placeholder =
                    opcao.endereco;
                  document.getElementById("numero")!.placeholder = opcao.numero;

                  document.getElementById("cep")!.placeholder = opcao.cep;

                  document.getElementById("bairro")!.placeholder = opcao.bairro;

                  document.getElementById("complemento")!.placeholder =
                    opcao.complemento;
                }}
                onMouseLeave={() => {
                  {
                    document.getElementById("telefone")!.placeholder = "";

                    document.getElementById("endereco")!.placeholder = "";
                    document.getElementById("numero")!.placeholder = "";

                    document.getElementById("cep")!.placeholder = "";

                    document.getElementById("bairro")!.placeholder = "";

                    document.getElementById("complemento")!.placeholder = "";
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Arrow Down") {
                    if (document.getElementById(`nome_${i + 1}`)) {
                      document.getElementById(`nome_${i + 1}`)?.focus();
                    } else {
                      document.getElementById(`nome_0`)?.focus();
                    }
                  }
                }}
                key={Math.random()}
              >
                {opcao.nome} ({opcao.telefone})
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
