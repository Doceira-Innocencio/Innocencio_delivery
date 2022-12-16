import { useState } from "react";

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
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  return (
    <div className="dropDownContainer">
      <input
        id={id}
        placeholder=" "
        type="text"
        onBlur={onBlur}
        className="dropDownHeader"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        autoComplete="off"
        onClick={toggling}
      />
      {isOpen && (
        <div className="dropDownListContainer">
          <ul className="dropDownList">
            {opcoes.map((opcao, i) => (
              <li
                className="listItem"
                id={`nome_${i}`}
                onMouseOver={() => {
                  document.getElementById("nome");
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
                    document.getElementById("nome");
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
                {opcao.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
